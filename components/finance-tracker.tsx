"use client"

import { useState, useEffect } from "react"
import { Header } from "./finance/header"
import { SummaryCards } from "./finance/summary-cards"
import { StatisticsChart } from "./finance/statistics-chart"
import { TransactionTabs } from "./finance/transaction-tabs"
import type { Transaction, TransactionType } from "@/lib/finance-data"
import { months } from "@/lib/finance-data"
import { convertDateToISO, convertDateFromISO, calculateMonthFromDate } from "@/lib/api-utils"
import {
  useTransactions,
  useTransactionStats,
  useCreateTransaction,
  useUpdateTransaction,
  useDeleteTransaction,
} from "@/hooks/use-transactions"
import {
  SummaryCardSkeleton,
  StatisticsChartSkeleton,
  TransactionTabsSkeleton,
} from "@/components/ui/skeletons"
import { ErrorAlert } from "@/components/ui/error-alert"

export default function FinanceTracker() {
  const [selectedMonth, setSelectedMonth] = useState("ডিসেম্বর ২০২৫")
  const [showError, setShowError] = useState(true)

  // Set current month on client mount
  useEffect(() => {
    const currentMonth = calculateMonthFromDate(new Date())
    setSelectedMonth(currentMonth)
  }, [])

  // Fetch data using React Query
  const {
    data: transactions = [],
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useTransactions({ month: selectedMonth })

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useTransactionStats(selectedMonth)

  // Mutations
  const createMutation = useCreateTransaction()
  const updateMutation = useUpdateTransaction()
  const deleteMutation = useDeleteTransaction()

  const handleAddTransaction = async (transaction: Omit<Transaction, "id">) => {
    // Convert date from dd/MM/yyyy to YYYY-MM-DD
    const isoDate = convertDateToISO(transaction.date)

    createMutation.mutate({
      title: transaction.title,
      amount: transaction.amount,
      date: isoDate,
      description: transaction.description,
      type: transaction.type,
    })
  }

  const handleDeleteTransaction = async (id: string) => {
    deleteMutation.mutate(id)
  }

  const handleEditTransaction = async (
    id: string,
    updatedTransaction: Omit<Transaction, "id">
  ) => {
    // Convert date from dd/MM/yyyy to YYYY-MM-DD
    const isoDate = convertDateToISO(updatedTransaction.date)

    updateMutation.mutate({
      id,
      title: updatedTransaction.title,
      amount: updatedTransaction.amount,
      date: isoDate,
      description: updatedTransaction.description,
      type: updatedTransaction.type,
    })
  }

  const getFilteredTransactions = (type: TransactionType) => {
    // Convert dates from ISO to dd/MM/yyyy format for display
    return transactions
      .filter((t) => t.type === type)
      .map((t) => ({
        ...t,
        date: convertDateFromISO(t.date),
      }))
  }

  const totals = stats?.totals || { income: 0, expense: 0, savings: 0 }

  // Check for errors
  const hasError = transactionsError || statsError
  const errorMessage = transactionsError?.message || statsError?.message || ""

  // Check if any mutation is in progress
  const isAnyMutationLoading =
    createMutation.isPending || updateMutation.isPending || deleteMutation.isPending

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <Header selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} months={months} />

      {/* Error Alert */}
      {hasError && showError && (
        <ErrorAlert
          title="ডেটা লোড করতে সমস্যা হয়েছে"
          message={errorMessage}
          onDismiss={() => setShowError(false)}
        />
      )}

      {/* Summary Cards */}
      {statsLoading ? (
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <SummaryCardSkeleton />
          <SummaryCardSkeleton />
          <SummaryCardSkeleton />
        </div>
      ) : (
        <SummaryCards totals={totals} />
      )}

      {/* Statistics Chart */}
      {statsLoading ? <StatisticsChartSkeleton /> : <StatisticsChart totals={totals} />}

      {/* Transaction Tabs */}
      {transactionsLoading ? (
        <TransactionTabsSkeleton />
      ) : (
        <TransactionTabs
          incomeTransactions={getFilteredTransactions("income")}
          expenseTransactions={getFilteredTransactions("expense")}
          savingsTransactions={getFilteredTransactions("savings")}
          onAdd={handleAddTransaction}
          onDelete={handleDeleteTransaction}
          onEdit={handleEditTransaction}
          selectedMonth={selectedMonth}
          isLoading={isAnyMutationLoading}
        />
      )}
    </div>
  )
}
