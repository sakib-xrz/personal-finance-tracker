"use client"

import { ArrowUpRight, ArrowDownRight, PiggyBank } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface SummaryCardsProps {
  totals: {
    income: number
    expense: number
    savings: number
  }
}

export function SummaryCards({ totals }: SummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const cards = [
    {
      title: "মোট আয়",
      amount: totals.income,
      icon: ArrowUpRight,
      bgColor: "bg-income-light",
      iconColor: "text-income",
      borderColor: "border-income/20",
    },
    {
      title: "মোট ব্যয়",
      amount: totals.expense,
      icon: ArrowDownRight,
      bgColor: "bg-expense-light",
      iconColor: "text-expense",
      borderColor: "border-expense/20",
    },
    {
      title: "বর্তমান সঞ্চয়",
      amount: totals.savings,
      icon: PiggyBank,
      bgColor: "bg-savings-light",
      iconColor: "text-savings",
      borderColor: "border-savings/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {cards.map((card) => (
        <Card
          key={card.title}
          className={`${card.bgColor} border ${card.borderColor} shadow-sm hover:shadow-md transition-shadow`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{card.title}</p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{formatCurrency(card.amount)}</p>
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
