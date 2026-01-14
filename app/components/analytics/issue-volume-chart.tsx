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

export interface IssueVolumeChartProps {
  data: Array<{
    month: string
    issues: number
    resolved: number
  }>
}

export function IssueVolumeChart({ data }: IssueVolumeChartProps) {
  return (
    <Card className="border-langchain-purple/20">
      <CardHeader>
        <CardTitle className="font-mono text-xl">Issue Volume Trend</CardTitle>
        <p className="font-mono text-sm text-muted-foreground">
          Last 12 months activity
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorIssues" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(270, 70%, 60%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(270, 70%, 60%)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(174, 72%, 56%)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--foreground))"
              fontSize={12}
              fontFamily="var(--font-jetbrains-mono)"
              opacity={0.7}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              fontSize={12}
              fontFamily="var(--font-jetbrains-mono)"
              opacity={0.7}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem",
                fontFamily: "var(--font-jetbrains-mono)",
              }}
            />
            <Legend
              wrapperStyle={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="issues"
              stroke="#4d65ff"
              strokeWidth={3}
              fill="url(#colorIssues)"
              dot={{ fill: "#4d65ff", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#14b8a6"
              strokeWidth={3}
              fill="url(#colorResolved)"
              dot={{ fill: "#14b8a6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
