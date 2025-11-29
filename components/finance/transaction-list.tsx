"use client"

import { useState } from "react"
import { Edit2, Trash2, Calendar, Tag, ReceiptText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EditTransactionDialog } from "./edit-transaction-dialog"
import type { Transaction, TransactionType } from "@/lib/finance-data"

interface TransactionListProps {
  transactions: Transaction[]
  type: TransactionType
  onDelete: (id: string) => void
  onEdit: (id: string, transaction: Omit<Transaction, "id">) => void
  selectedMonth: string
}

export function TransactionList({ transactions, type, onDelete, onEdit, selectedMonth }: TransactionListProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getTypeStyles = () => {
    switch (type) {
      case "income":
        return {
          text: "text-income",
          bg: "bg-income/10",
          border: "border-income/20",
          accent: "bg-income",
        }
      case "expense":
        return {
          text: "text-expense",
          bg: "bg-expense/10",
          border: "border-expense/20",
          accent: "bg-expense",
        }
      case "savings":
        return {
          text: "text-savings",
          bg: "bg-savings/10",
          border: "border-savings/20",
          accent: "bg-savings",
        }
    }
  }

  const getTypeLabel = () => {
    switch (type) {
      case "income":
        return "আয়"
      case "expense":
        return "ব্যয়"
      case "savings":
        return "সঞ্চয়"
    }
  }

  const styles = getTypeStyles()

  if (transactions.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">এই মাসে কোনো {getTypeLabel()} নেই</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-3">
        {transactions.map((transaction) => (
          <Card
            key={transaction.id}
            className={`shadow-sm border-l-4 ${styles.border} hover:shadow-md transition-shadow`}
            style={{ borderLeftColor: `hsl(var(--${type}))` }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                {/* Left: Transaction details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate text-lg">{transaction.title}</h3>

                  <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {transaction.date}
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                    <ReceiptText className="h-3.5 w-3.5" />
                    {transaction.description}
                  </div>
                </div>

                {/* Right: Amount and actions */}
                <div className="flex flex-col items-end gap-2">
                  <span className={`font-bold text-lg ${styles.text}`}>{formatCurrency(transaction.amount)}</span>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditTransaction(transaction)}
                      className="h-8 w-8 hover:bg-primary/10 hover:text-primary"
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">সম্পাদনা</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(transaction.id)}
                      className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">মুছুন</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Keep existing dialogs unchanged */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
            <AlertDialogDescription>
              এই লেনদেনটি স্থায়ীভাবে মুছে ফেলা হবে। এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  onDelete(deleteId)
                  setDeleteId(null)
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              মুছে ফেলুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {editTransaction && (
        <EditTransactionDialog
          transaction={editTransaction}
          onEdit={(updated) => {
            onEdit(editTransaction.id, updated)
            setEditTransaction(null)
          }}
          onClose={() => setEditTransaction(null)}
          selectedMonth={selectedMonth}
        />
      )}
    </>
  )
}
