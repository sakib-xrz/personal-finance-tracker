export type TransactionType = "income" | "expense" | "savings"

export interface Transaction {
  id: string
  title: string
  amount: number
  date: string
  description: string
  type: TransactionType
  month: string
}

export const months = [
  "জানুয়ারি ২০২৫",
  "ফেব্রুয়ারি ২০২৫",
  "মার্চ ২০২৫",
  "এপ্রিল ২০২৫",
  "মে ২০২৫",
  "জুন ২০২৫",
  "জুলাই ২০২৫",
  "আগস্ট ২০২৫",
  "সেপ্টেম্বর ২০২৫",
  "অক্টোবর ২০২৫",
  "নভেম্বর ২০২৫",
  "ডিসেম্বর ২০২৫",
]

export const initialTransactions: Transaction[] = []
