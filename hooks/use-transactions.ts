"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { Transaction, TransactionType } from "@/lib/finance-data"

// API response types
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  details?: Array<{ field: string; message: string }>
}

interface TransactionStats {
  totals: {
    income: number
    expense: number
    savings: number
    balance: number
  }
  counts: {
    total: number
    income: number
    expense: number
    savings: number
  }
  descriptionBreakdown: Record<
    string,
    { income: number; expense: number; savings: number }
  >
}

// Fetch transactions
export function useTransactions(filters?: {
  type?: TransactionType
  month?: string
  description?: string
}) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters?.type) params.append("type", filters.type)
      if (filters?.month) params.append("month", filters.month)
      if (filters?.description) params.append("description", filters.description)

      const response = await fetch(`/api/transactions?${params.toString()}`)
      const data: ApiResponse<Transaction[]> = await response.json()

      if (!data.success) {
        throw new Error(data.error || "লেনদেন আনতে ব্যর্থ হয়েছে")
      }

      return data.data || []
    },
  })
}

// Fetch transaction statistics
export function useTransactionStats(month?: string) {
  return useQuery({
    queryKey: ["transaction-stats", month],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (month) params.append("month", month)

      const response = await fetch(`/api/transactions/stats?${params.toString()}`)
      const data: ApiResponse<TransactionStats> = await response.json()

      if (!data.success) {
        throw new Error(data.error || "পরিসংখ্যান আনতে ব্যর্থ হয়েছে")
      }

      return data.data || {
        totals: { income: 0, expense: 0, savings: 0, balance: 0 },
        counts: { total: 0, income: 0, expense: 0, savings: 0 },
        descriptionBreakdown: {},
      }
    },
  })
}

// Create transaction
export function useCreateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (transaction: {
      title: string
      amount: number
      date: string
      description: string
      type: TransactionType
    }) => {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      })

      const data: ApiResponse<Transaction> = await response.json()

      if (!data.success) {
        // Handle validation errors
        if (data.details && data.details.length > 0) {
          const errorMessages = data.details.map((d) => d.message).join(", ")
          throw new Error(errorMessages)
        }
        throw new Error(data.error || "লেনদেন তৈরি করতে ব্যর্থ হয়েছে")
      }

      return data.data
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["transaction-stats"] })
      
      // Show success toast
      toast.success("সফল", {
        description: "লেনদেন সফলভাবে তৈরি হয়েছে",
      })
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error("ত্রুটি", {
        description: error.message,
      })
    },
  })
}

// Update transaction
export function useUpdateTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      ...transaction
    }: {
      id: string
      title?: string
      amount?: number
      date?: string
      description?: string
      type?: TransactionType
    }) => {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      })

      const data: ApiResponse<Transaction> = await response.json()

      if (!data.success) {
        // Handle validation errors
        if (data.details && data.details.length > 0) {
          const errorMessages = data.details.map((d) => d.message).join(", ")
          throw new Error(errorMessages)
        }
        throw new Error(data.error || "লেনদেন আপডেট করতে ব্যর্থ হয়েছে")
      }

      return data.data
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["transaction-stats"] })
      
      // Show success toast
      toast.success("সফল", {
        description: "লেনদেন সফলভাবে আপডেট হয়েছে",
      })
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error("ত্রুটি", {
        description: error.message,
      })
    },
  })
}

// Delete transaction
export function useDeleteTransaction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      })

      const data: ApiResponse<null> = await response.json()

      if (!data.success) {
        throw new Error(data.error || "লেনদেন মুছে ফেলতে ব্যর্থ হয়েছে")
      }

      return data
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["transactions"] })
      queryClient.invalidateQueries({ queryKey: ["transaction-stats"] })
      
      // Show success toast
      toast.success("সফল", {
        description: "লেনদেন সফলভাবে মুছে ফেলা হয়েছে",
      })
    },
    onError: (error: Error) => {
      // Show error toast
      toast.error("ত্রুটি", {
        description: error.message,
      })
    },
  })
}
