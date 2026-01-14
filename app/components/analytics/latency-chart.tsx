"use client"

import * as React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface LatencyChartProps {
  data: Array<{
    date: string
    p50: number
    p95: number
    p99: number
  }>
}

export function LatencyChart({ data }: LatencyChartProps) {
  // Format date to show only month/day
  const formattedData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }))

  return (
    <Card className="border-langchain-purple/20">
      <CardHeader>
        <CardTitle className="font-mono text-xl">Query Latency Percentiles</CardTitle>
        <p className="font-mono text-sm text-muted-foreground">
          Response time distribution over last 7 days
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <defs>
              <linearGradient id="colorP50" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D7A78" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2D7A78" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorP95" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BFB4FD" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#BFB4FD" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorP99" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.1} />
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
              label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
              formatter={(value: number) => [`${value}ms`, '']}
            />
            <Legend
              wrapperStyle={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="p50"
              stroke="#2D7A78"
              strokeWidth={2}
              fill="url(#colorP50)"
              dot={{ fill: "#2D7A78", r: 3 }}
              activeDot={{ r: 5 }}
              name="P50 (median)"
            />
            <Line
              type="monotone"
              dataKey="p95"
              stroke="#BFB4FD"
              strokeWidth={2}
              fill="url(#colorP95)"
              dot={{ fill: "#BFB4FD", r: 3 }}
              activeDot={{ r: 5 }}
              name="P95"
            />
            <Line
              type="monotone"
              dataKey="p99"
              stroke="#ff6b6b"
              strokeWidth={2}
              fill="url(#colorP99)"
              dot={{ fill: "#ff6b6b", r: 3 }}
              activeDot={{ r: 5 }}
              name="P99"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
