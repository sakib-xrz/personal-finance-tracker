import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

// GET: Fetch transaction statistics
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get("month");

    const where: any = {};

    if (month) {
      where.month = month;
    }

    const prisma = getPrisma();
    const transactions = await prisma.transaction.findMany({
      where,
    });

    // Calculate totals
    let income = 0;
    let expense = 0;
    let savings = 0;

    transactions.forEach((transaction) => {
      const amount = Number(transaction.amount);
      switch (transaction.type) {
        case "INCOME":
          income += amount;
          break;
        case "EXPENSE":
          expense += amount;
          break;
        case "SAVINGS":
          savings += amount;
          break;
      }
    });

    // Calculate additional statistics
    const totalTransactions = transactions.length;
    const incomeTransactions = transactions.filter(
      (t) => t.type === "INCOME"
    ).length;
    const expenseTransactions = transactions.filter(
      (t) => t.type === "EXPENSE"
    ).length;
    const savingsTransactions = transactions.filter(
      (t) => t.type === "SAVINGS"
    ).length;

    // Calculate balance (income - expense - savings)
    const balance = income - expense - savings;

    // Get description breakdown
    const descriptionBreakdown: Record<
      string,
      { income: number; expense: number; savings: number }
    > = {};

    transactions.forEach((transaction) => {
      const description = transaction.description;
      const amount = Number(transaction.amount);

      if (!descriptionBreakdown[description]) {
        descriptionBreakdown[description] = { income: 0, expense: 0, savings: 0 };
      }

      switch (transaction.type) {
        case "INCOME":
          descriptionBreakdown[description].income += amount;
          break;
        case "EXPENSE":
          descriptionBreakdown[description].expense += amount;
          break;
        case "SAVINGS":
          descriptionBreakdown[description].savings += amount;
          break;
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        totals: {
          income,
          expense,
          savings,
          balance,
        },
        counts: {
          total: totalTransactions,
          income: incomeTransactions,
          expense: expenseTransactions,
          savings: savingsTransactions,
        },
        descriptionBreakdown,
      },
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      {
        success: false,
        error: "পরিসংখ্যান আনতে ব্যর্থ হয়েছে",
        message: error instanceof Error ? error.message : "অজানা ত্রুটি",
      },
      { status: 500 }
    );
  }
}
