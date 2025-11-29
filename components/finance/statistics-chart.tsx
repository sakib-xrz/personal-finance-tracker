"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface StatisticsChartProps {
  totals: {
    income: number
    expense: number
    savings: number
  }
}

export function StatisticsChart({ totals }: StatisticsChartProps) {
  const allData = [
    { name: "আয়", value: totals.income, color: "#22c55e" },
    { name: "ব্যয়", value: totals.expense, color: "#ef4444" },
    { name: "সঞ্চয়", value: totals.savings, color: "#3b82f6" },
  ]
  
  // Only show data entries with values greater than 0
  const data = allData.filter(item => item.value > 0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const total = totals.income + totals.expense + totals.savings

  const CustomTooltip = ({
    active,
    payload,
  }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">{formatCurrency(payload[0].value)}</p>
          <p className="text-xs text-muted-foreground">{((payload[0].value / total) * 100).toFixed(1)}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="mb-8 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">এই মাসের পরিসংখ্যান</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] sm:h-[350px]">
          {total > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend formatter={(value) => <span className="text-foreground">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">এই মাসে কোনো লেনদেন নেই</div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
          {allData.map((item) => (
            <div key={item.name} className="text-center">
              <div className="w-3 h-3 rounded-full mx-auto mb-2" style={{ backgroundColor: item.color }} />
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{formatCurrency(item.value)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
