"use client"

import type React from "react"

import { useState } from "react"
import { Plus, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { format, setMonth, setYear, getMonth, getYear } from "date-fns"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Transaction, TransactionType } from "@/lib/finance-data"
import { toBengaliNumber, bengaliMonths } from "@/lib/bengali-utils"

interface AddTransactionDialogProps {
  type: TransactionType
  onAdd: (transaction: Omit<Transaction, "id">) => void
  selectedMonth: string
}

function BengaliCalendar({
  selected,
  onSelect,
}: {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
}) {
  const [currentMonth, setCurrentMonth] = useState(selected || new Date())

  const currentYear = getYear(currentMonth)
  const currentMonthIndex = getMonth(currentMonth)

  // Generate years from 2020 to 2030
  const years = Array.from({ length: 11 }, (_, i) => 2020 + i)

  const handleMonthChange = (monthIndex: string) => {
    setCurrentMonth(setMonth(currentMonth, Number.parseInt(monthIndex)))
  }

  const handleYearChange = (year: string) => {
    setCurrentMonth(setYear(currentMonth, Number.parseInt(year)))
  }

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() - 1)
    setCurrentMonth(newDate)
  }

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth)
    newDate.setMonth(newDate.getMonth() + 1)
    setCurrentMonth(newDate)
  }

  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)

  // Generate calendar days
  const days: (number | null)[] = []

  // Add empty cells for days before the first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const weekdays = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"]

  const isSelected = (day: number) => {
    if (!selected) return false
    return (
      selected.getDate() === day && selected.getMonth() === currentMonthIndex && selected.getFullYear() === currentYear
    )
  }

  const isToday = (day: number) => {
    const today = new Date()
    return today.getDate() === day && today.getMonth() === currentMonthIndex && today.getFullYear() === currentYear
  }

  const handleDayClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonthIndex, day)
    onSelect(newDate)
  }

  return (
    <div className="p-3 bg-background">
      {/* Header with navigation and dropdowns */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {/* Month dropdown */}
          <Select value={String(currentMonthIndex)} onValueChange={handleMonthChange}>
            <SelectTrigger className="h-8 w-auto gap-1 border-input text-sm font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {bengaliMonths.map((month, index) => (
                <SelectItem key={index} value={String(index)}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year dropdown */}
          <Select value={String(currentYear)} onValueChange={handleYearChange}>
            <SelectTrigger className="h-8 w-auto gap-1 border-input text-sm font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {toBengaliNumber(year)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center text-xs text-muted-foreground font-medium py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className="aspect-square">
            {day !== null && (
              <button
                type="button"
                onClick={() => handleDayClick(day)}
                className={cn(
                  "w-full h-full flex items-center justify-center text-sm rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isSelected(day) &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  isToday(day) && !isSelected(day) && "bg-accent text-accent-foreground",
                )}
              >
                {toBengaliNumber(day)}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AddTransactionDialog({ type, onAdd, selectedMonth }: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [description, setDescription] = useState("")
  const [calendarOpen, setCalendarOpen] = useState(false)

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

  const getButtonColor = () => {
    switch (type) {
      case "income":
        return "bg-income hover:bg-income/90"
      case "expense":
        return "bg-expense hover:bg-expense/90"
      case "savings":
        return "bg-savings hover:bg-savings/90"
    }
  }

  const formatDateBengali = (date: Date) => {
    const day = toBengaliNumber(date.getDate())
    const month = bengaliMonths[date.getMonth()]
    const year = toBengaliNumber(date.getFullYear())
    return `${day} ${month} ${year}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !amount || !date || !description) return

    const formattedDate = format(date, "dd/MM/yyyy")

    onAdd({
      title,
      amount: Number.parseFloat(amount),
      date: formattedDate,
      description,
      type,
      month: selectedMonth,
    })

    setTitle("")
    setAmount("")
    setDate(undefined)
    setDescription("")
    setOpen(false)
  }

  const resetForm = () => {
    setTitle("")
    setAmount("")
    setDate(undefined)
    setDescription("")
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen)
        if (!isOpen) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button className={`${getButtonColor()} text-white`}>
          <Plus className="w-4 h-4 mr-2" />
          নতুন যোগ করুন
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>নতুন {getTypeLabel()} যোগ করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">বিবরণ</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="বিবরণ লিখুন"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">পরিমাণ (টাকা)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="০"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>তারিখ</Label>
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? formatDateBengali(date) : "তারিখ নির্বাচন করুন"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <BengaliCalendar
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate)
                    setCalendarOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">বর্ণনা</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="বর্ণনা লিখুন"
              required
            />
          </div>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              বাতিল
            </Button>
            <Button type="submit" className={`${getButtonColor()} text-white`}>
              যোগ করুন
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
