import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import {
  tsTypeToPrisma,
  formatTransaction,
  calculateMonthFromDate,
} from "@/lib/api-utils";
import { z } from "zod";

const updateTransactionSchema = z.object({
  title: z.string().min(1, "শিরোনাম আবশ্যক").optional(),
  amount: z.number().positive("পরিমাণ অবশ্যই ধনাত্মক হতে হবে").optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "তারিখ অবশ্যই YYYY-MM-DD ফরম্যাটে হতে হবে")
    .optional(),
  description: z.string().min(1, "বিবরণ আবশ্যক").optional(),
  type: z
    .enum(["income", "expense", "savings"], {
      errorMap: () => ({ message: "অবৈধ লেনদেনের ধরন" }),
    })
    .optional(),
});

// GET: Fetch a single transaction
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const prisma = getPrisma();
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!transaction) {
      return NextResponse.json(
        {
          success: false,
          error: "লেনদেন পাওয়া যায়নি",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: formatTransaction(transaction),
    });
  } catch (error) {
    console.error("Error fetching transaction:", error);
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

// PATCH: Update a transaction
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if transaction exists
    const prisma = getPrisma();
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      return NextResponse.json(
        {
          success: false,
          error: "লেনদেন পাওয়া যায়নি",
        },
        { status: 404 }
      );
    }

    // Validate request body
    const validationResult = updateTransactionSchema.safeParse(body);
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

    const updateData: any = {};

    if (validationResult.data.title !== undefined) {
      updateData.title = validationResult.data.title;
    }
    if (validationResult.data.amount !== undefined) {
      updateData.amount = validationResult.data.amount;
    }
    if (validationResult.data.date !== undefined) {
      updateData.date = new Date(validationResult.data.date);
      updateData.month = calculateMonthFromDate(validationResult.data.date);
    }
    if (validationResult.data.description !== undefined) {
      updateData.description = validationResult.data.description;
    }
    if (validationResult.data.type !== undefined) {
      updateData.type = tsTypeToPrisma(validationResult.data.type);
    }

    const transaction = await prisma.transaction.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: formatTransaction(transaction),
      message: "লেনদেন সফলভাবে আপডেট হয়েছে",
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json(
      {
        success: false,
        error: "লেনদেন আপডেট করতে ব্যর্থ হয়েছে",
        message: error instanceof Error ? error.message : "অজানা ত্রুটি",
      },
      { status: 500 }
    );
  }
}

// DELETE: Delete a transaction
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if transaction exists
    const prisma = getPrisma();
    const existingTransaction = await prisma.transaction.findUnique({
      where: { id },
    });

    if (!existingTransaction) {
      return NextResponse.json(
        {
          success: false,
          error: "লেনদেন পাওয়া যায়নি",
        },
        { status: 404 }
      );
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "লেনদেন সফলভাবে মুছে ফেলা হয়েছে",
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json(
      {
        success: false,
        error: "লেনদেন মুছে ফেলতে ব্যর্থ হয়েছে",
        message: error instanceof Error ? error.message : "অজানা ত্রুটি",
      },
      { status: 500 }
    );
  }
}
