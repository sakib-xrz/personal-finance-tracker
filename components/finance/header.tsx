"use client"

import { Wallet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface HeaderProps {
  selectedMonth: string
  onMonthChange: (month: string) => void
  months: string[]
}

export function Header({ selectedMonth, onMonthChange, months }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Wallet className="w-7 h-7 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">আমার হিসাব</h1>
          <p className="text-sm text-muted-foreground">ব্যক্তিগত আর্থিক ব্যবস্থাপনা</p>
        </div>
      </div>

      <Select value={selectedMonth} onValueChange={onMonthChange}>
        <SelectTrigger className="w-full sm:w-[200px] bg-card">
          <SelectValue placeholder="মাস নির্বাচন করুন" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  )
}
