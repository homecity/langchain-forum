"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface CategoryChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
}

export function CategoryChart({ data }: CategoryChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="border-langchain-purple/20">
      <CardHeader>
        <CardTitle className="font-mono text-xl">Category Distribution</CardTitle>
        <p className="font-mono text-sm text-muted-foreground">
          Issues by category ({total} total)
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
              formatter={(value: number) => [
                `${value} issues (${((value / total) * 100).toFixed(1)}%)`,
                "Count",
              ]}
            />
            <Legend
              wrapperStyle={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "12px",
              }}
              formatter={(value: string, entry: any) => {
                const itemValue = entry.payload?.value ?? 0
                const percentage = total > 0 ? ((itemValue / total) * 100).toFixed(1) : '0.0'
                return `${value} (${percentage}%)`
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
