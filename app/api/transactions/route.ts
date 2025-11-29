import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import {
  tsTypeToPrisma,
  formatTransaction,
  calculateMonthFromDate,
} from "@/lib/api-utils";
import { z } from "zod";

// Validation schema
const createTransactionSchema = z.object({
  title: z.string().min(1, "শিরোনাম আবশ্যক"),
  amount: z.number().positive("পরিমাণ অবশ্যই ধনাত্মক হতে হবে"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "তারিখ অবশ্যই YYYY-MM-DD ফরম্যাটে হতে হবে"),
  description: z.string().min(1, "বিবরণ আবশ্যক"),
  type: z.enum(["income", "expense", "savings"], {
    errorMap: () => ({ message: "অবৈধ লেনদেনের ধরন" }),
  }),
});

// GET: Fetch transactions with optional filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") as "income" | "expense" | "savings" | null;
    const month = searchParams.get("month");
    const description = searchParams.get("description");

    const where: any = {};

    if (type && ["income", "expense", "savings"].includes(type)) {
      where.type = tsTypeToPrisma(type);
    }

    if (month) {
      where.month = month;
    }

    if (description) {
      where.description = description;
    }

    const prisma = getPrisma();
    const transactions = await prisma.transaction.findMany({
      where,
      orderBy: {
        date: "desc",
      },
    });

    const formattedTransactions = transactions.map(formatTransaction);

    return NextResponse.json({
      success: true,
      data: formattedTransactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      {
        success: false,
        error: "লেনদেন আনতে ব্যর্থ হয়েছে",
        message: error instanceof Error ? error.message : "অজানা ত্রুটি",
      },
      { status: 500 }
    );
  }
}

// POST: Create a new transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validationResult = createTransactionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "যাচাইকরণ ব্যর্থ হয়েছে",
          details: validationResult.error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    const { title, amount, date, description, type } = validationResult.data;

    // Calculate month from date
    const month = calculateMonthFromDate(date);

    // Create transaction in database
    const prisma = getPrisma();
    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount,
        date: new Date(date),
        description,
        type: tsTypeToPrisma(type),
        month,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: formatTransaction(transaction),
        message: "লেনদেন সফলভাবে তৈরি হয়েছে",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      {
        success: false,
        error: "লেনদেন তৈরি করতে ব্যর্থ হয়েছে",
        message: error instanceof Error ? error.message : "অজানা ত্রুটি",
      },
      { status: 500 }
    );
  }
}
