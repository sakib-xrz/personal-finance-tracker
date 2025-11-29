"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionList } from "./transaction-list"
import { AddTransactionDialog } from "./add-transaction-dialog"
import type { Transaction, TransactionType } from "@/lib/finance-data"

interface TransactionTabsProps {
  incomeTransactions: Transaction[]
  expenseTransactions: Transaction[]
  savingsTransactions: Transaction[]
  onAdd: (transaction: Omit<Transaction, "id">) => void
  onDelete: (id: string) => void
  onEdit: (id: string, transaction: Omit<Transaction, "id">) => void
  selectedMonth: string
  isLoading?: boolean
}

export function TransactionTabs({
  incomeTransactions,
  expenseTransactions,
  savingsTransactions,
  onAdd,
  onDelete,
  onEdit,
  selectedMonth,
}: TransactionTabsProps) {
  const [activeTab, setActiveTab] = useState<TransactionType>("income")

  const tabConfig = [
    {
      value: "income" as TransactionType,
      label: "আয়",
      transactions: incomeTransactions,
      colorClass: "data-[state=active]:bg-income data-[state=active]:text-white",
    },
    {
      value: "expense" as TransactionType,
      label: "ব্যয়",
      transactions: expenseTransactions,
      colorClass: "data-[state=active]:bg-expense data-[state=active]:text-white",
    },
    {
      value: "savings" as TransactionType,
      label: "সঞ্চয়",
      transactions: savingsTransactions,
      colorClass: "data-[state=active]:bg-savings data-[state=active]:text-white",
    },
  ]

  return (
    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TransactionType)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <TabsList className="grid w-full sm:w-auto grid-cols-3 h-12">
          {tabConfig.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`px-6 font-medium transition-all ${tab.colorClass}`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <AddTransactionDialog type={activeTab} onAdd={onAdd} selectedMonth={selectedMonth} />
      </div>

      {tabConfig.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <TransactionList
            transactions={tab.transactions}
            type={tab.value}
            onDelete={onDelete}
            onEdit={onEdit}
            selectedMonth={selectedMonth}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
