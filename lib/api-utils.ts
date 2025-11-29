import { TransactionType as PrismaTransactionType, Transaction } from "@prisma/client"
import type { TransactionType } from "./finance-data"
import { bengaliMonths, toBengaliNumber } from "./bengali-utils"

/**
 * Convert Prisma enum to TypeScript type
 */
export function prismaTypeToTS(type: PrismaTransactionType): TransactionType {
  switch (type) {
    case "INCOME":
      return "income"
    case "EXPENSE":
      return "expense"
    case "SAVINGS":
      return "savings"
    default:
      return "income"
  }
}

/**
 * Convert TypeScript type to Prisma enum
 */
export function tsTypeToPrisma(type: TransactionType): PrismaTransactionType {
  switch (type) {
    case "income":
      return "INCOME"
    case "expense":
      return "EXPENSE"
    case "savings":
      return "SAVINGS"
    default:
      return "INCOME"
  }
}

/**
 * Calculate month string from date in Bengali format (e.g., "জানুয়ারি ২০২৫")
 */
export function calculateMonthFromDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  const monthIndex = dateObj.getMonth()
  const year = dateObj.getFullYear()
  const bengaliMonth = bengaliMonths[monthIndex]
  const bengaliYear = toBengaliNumber(year)
  return `${bengaliMonth} ${bengaliYear}`
}

/**
 * Convert Prisma Transaction to API Transaction format
 */
export function formatTransaction(prismaTransaction: Transaction) {
  // Handle date conversion - Prisma returns Date object
  const dateString = prismaTransaction.date instanceof Date
    ? prismaTransaction.date.toISOString().split("T")[0]
    : new Date(prismaTransaction.date).toISOString().split("T")[0]

  return {
    id: prismaTransaction.id,
    title: prismaTransaction.title,
    amount: Number(prismaTransaction.amount),
    date: dateString, // Format as YYYY-MM-DD
    description: prismaTransaction.description,
    type: prismaTypeToTS(prismaTransaction.type),
    month: prismaTransaction.month,
  }
}

/**
 * Convert date from dd/MM/yyyy format to YYYY-MM-DD format
 */
export function convertDateToISO(dateString: string): string {
  // Handle Bengali date format (dd/MM/yyyy) or already ISO format
  if (dateString.includes("/")) {
    const parts = dateString.split("/")
    if (parts.length === 3) {
      const day = parts[0].padStart(2, "0")
      const month = parts[1].padStart(2, "0")
      const year = parts[2]
      return `${year}-${month}-${day}`
    }
  }
  // If already in ISO format or invalid, return as is
  return dateString
}

/**
 * Convert date from YYYY-MM-DD format to dd/MM/yyyy format
 */
export function convertDateFromISO(dateString: string): string {
  // Handle ISO format (YYYY-MM-DD)
  if (dateString.includes("-") && dateString.length === 10) {
    const parts = dateString.split("-")
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
  }
  // If already in dd/MM/yyyy format or invalid, return as is
  return dateString
}

