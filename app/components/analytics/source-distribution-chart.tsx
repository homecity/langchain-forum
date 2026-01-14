"use client"

import * as React from "react"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface SourceDistributionChartProps {
  data: {
    forum: number
    docs: number
  }
}

const COLORS = {
  forum: '#BFB4FD', // langchain purple
  docs: '#2D7A78',  // langchain green
}

export function SourceDistributionChart({ data }: SourceDistributionChartProps) {
  const chartData = [
    { name: 'Forum Posts', value: data.forum, color: COLORS.forum },
    { name: 'Documentation', value: data.docs, color: COLORS.docs },
  ]

  return (
    <Card className="border-langchain-purple/20">
      <CardHeader>
        <CardTitle className="font-mono text-xl">Source Distribution</CardTitle>
        <p className="font-mono text-sm text-muted-foreground">
          Retrieval source breakdown
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
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
              formatter={(value: number) => [`${value}%`, '']}
            />
            <Legend
              wrapperStyle={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Stats summary */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-langchain-purple/20 bg-gradient-to-br from-langchain-purple/5 to-transparent p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.forum }} />
              <span className="font-mono text-sm text-muted-foreground">Forum</span>
            </div>
            <p className="mt-2 font-mono text-2xl font-bold text-langchain-purple">{data.forum}%</p>
          </div>
          <div className="rounded-lg border border-langchain-teal/20 bg-gradient-to-br from-langchain-teal/5 to-transparent p-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.docs }} />
              <span className="font-mono text-sm text-muted-foreground">Docs</span>
            </div>
            <p className="mt-2 font-mono text-2xl font-bold text-langchain-teal">{data.docs}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
