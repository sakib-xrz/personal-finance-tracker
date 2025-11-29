"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Transaction } from "@/lib/finance-data"

interface EditTransactionDialogProps {
  transaction: Transaction
  onEdit: (transaction: Omit<Transaction, "id">) => void
  onClose: () => void
  selectedMonth: string
}

export function EditTransactionDialog({ transaction, onEdit, onClose, selectedMonth }: EditTransactionDialogProps) {
  const [title, setTitle] = useState(transaction.title)
  const [amount, setAmount] = useState(transaction.amount.toString())
  const [date, setDate] = useState(transaction.date)
  const [description, setDescription] = useState(transaction.description)

  const getTypeLabel = () => {
    switch (transaction.type) {
      case "income":
        return "আয়"
      case "expense":
        return "ব্যয়"
      case "savings":
        return "সঞ্চয়"
    }
  }

  const getButtonColor = () => {
    switch (transaction.type) {
      case "income":
        return "bg-income hover:bg-income/90"
      case "expense":
        return "bg-expense hover:bg-expense/90"
      case "savings":
        return "bg-savings hover:bg-savings/90"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !amount || !date || !description) return

    onEdit({
      title,
      amount: Number.parseFloat(amount),
      date,
      description,
      type: transaction.type,
      month: selectedMonth,
    })
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTypeLabel()} সম্পাদনা করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">বিবরণ</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="বিবরণ লিখুন"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-amount">পরিমাণ (টাকা)</Label>
            <Input
              id="edit-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="০"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-date">তারিখ</Label>
            <Input
              id="edit-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="দিন/মাস/বছর (যেমন: ০১/০১/২০২৫)"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">বর্ণনা</Label>
            <Input
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="বর্ণনা লিখুন"
              required
            />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              বাতিল
            </Button>
            <Button type="submit" className={`${getButtonColor()} text-white`}>
              সংরক্ষণ করুন
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
