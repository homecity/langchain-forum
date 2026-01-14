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
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface TagResolutionChartProps {
  data: Array<{
    tag: string
    resolutionRate: number
    total: number
  }>
}

export function TagResolutionChart({ data }: TagResolutionChartProps) {
  // Sort by resolution rate descending
  const sortedData = [...data].sort((a, b) => b.resolutionRate - a.resolutionRate)

  // Color based on resolution rate
  const getColor = (rate: number) => {
    if (rate >= 90) return "#14b8a6" // Teal for high
    if (rate >= 80) return "#4d65ff" // Purple for medium
    return "#9333ea" // Dark purple for lower
  }

  return (
    <Card className="border-langchain-purple/20">
      <CardHeader>
        <CardTitle className="font-mono text-xl">Resolution Rate by Tag</CardTitle>
        <p className="font-mono text-sm text-muted-foreground">
          Top performing categories
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              domain={[0, 100]}
              stroke="hsl(var(--foreground))"
              fontSize={12}
              fontFamily="var(--font-jetbrains-mono)"
              tickFormatter={(value) => `${value}%`}
              opacity={0.7}
            />
            <YAxis
              type="category"
              dataKey="tag"
              stroke="hsl(var(--foreground))"
              fontSize={12}
              fontFamily="var(--font-jetbrains-mono)"
              width={100}
              opacity={0.7}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
              formatter={(value: number, _name: string, props: any) => [
                `${value}% (${props.payload.total} issues)`,
                "Resolution Rate",
              ]}
            />
            <Bar dataKey="resolutionRate" radius={[0, 8, 8, 0]}>
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.resolutionRate)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
