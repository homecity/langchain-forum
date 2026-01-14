"use client"

import * as React from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface RelevanceChartProps {
  data: Array<{
    date: string
    score: number
  }>
}

export function RelevanceChart({ data }: RelevanceChartProps) {
  // Format date and convert score to percentage
  const formattedData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: Math.round(item.score * 100)
  }))

  return (
    <Card className="border-langchain-purple/20">
      <CardHeader>
        <CardTitle className="font-mono text-xl">Retrieval Quality Over Time</CardTitle>
        <p className="font-mono text-sm text-muted-foreground">
          Average relevance score trend
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={formattedData}>
            <defs>
              <linearGradient id="colorRelevance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#BFB4FD" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2D7A78" stopOpacity={0.2} />
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
              domain={[0, 100]}
              label={{ value: 'Relevance Score (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
              formatter={(value: number) => [`${value}%`, 'Relevance']}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#BFB4FD"
              strokeWidth={3}
              fill="url(#colorRelevance)"
              dot={{ fill: "#BFB4FD", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
