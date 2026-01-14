"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface TokenUsageChartProps {
  data: Array<{
    date: string
    input: number
    output: number
  }>
}

export function TokenUsageChart({ data }: TokenUsageChartProps) {
  // Format date and convert to K format
  const formattedData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    input: Math.round(item.input / 1000),
    output: Math.round(item.output / 1000)
  }))

  return (
    <Card className="border-langchain-purple/20">
      <CardHeader>
        <CardTitle className="font-mono text-xl">Token Usage Tracking</CardTitle>
        <p className="font-mono text-sm text-muted-foreground">
          Daily input and output token consumption
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData}>
            <defs>
              <linearGradient id="colorInput" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BFB4FD" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#BFB4FD" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D7A78" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#2D7A78" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              fontFamily="var(--font-jetbrains-mono)"
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              fontFamily="var(--font-jetbrains-mono)"
              label={{ value: 'Tokens (K)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
              formatter={(value: number) => [`${value}K`, '']}
            />
            <Legend
              wrapperStyle={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="input"
              fill="url(#colorInput)"
              radius={[4, 4, 0, 0]}
              name="Input Tokens"
            />
            <Bar
              dataKey="output"
              fill="url(#colorOutput)"
              radius={[4, 4, 0, 0]}
              name="Output Tokens"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
