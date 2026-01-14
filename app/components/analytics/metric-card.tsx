import * as React from "react"
import { Card } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"

export interface MetricCardProps {
  title: string
  value: string | number
  trend?: number
  unit?: string
  icon?: React.ReactNode
}

export function MetricCard({ title, value, trend, unit, icon }: MetricCardProps) {
  const isPositiveTrend = trend !== undefined && trend > 0
  const isNegativeTrend = trend !== undefined && trend < 0

  return (
    <Card variant="dark-gradient">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">{title}</p>
          {icon && <div className="text-[#2D7A78] dark:text-[#2D7A78]">{icon}</div>}
        </div>

        {/* Value */}
        <div className="mb-2 flex items-baseline gap-2">
          <h3 className="font-mono text-4xl font-bold text-foreground">
            {value}
          </h3>
          {unit && (
            <span className="font-mono text-lg text-gray-700 dark:text-gray-300">{unit}</span>
          )}
        </div>

        {/* Trend */}
        {trend !== undefined && (
          <div className="flex items-center gap-1">
            {isPositiveTrend && (
              <>
                <ArrowUp className="h-4 w-4 text-[#2D7A78]" />
                <span className="font-mono text-sm font-medium text-[#2D7A78]">
                  +{trend}
                </span>
              </>
            )}
            {isNegativeTrend && (
              <>
                <ArrowDown className="h-4 w-4 text-red-500 dark:text-red-400" />
                <span className="font-mono text-sm font-medium text-red-500 dark:text-red-400">
                  {trend}
                </span>
              </>
            )}
            {!isPositiveTrend && !isNegativeTrend && (
              <span className="font-mono text-sm text-gray-600 dark:text-gray-400">No change</span>
            )}
            <span className="ml-1 font-mono text-xs text-gray-500 dark:text-gray-500">vs prev</span>
          </div>
        )}
      </div>
    </Card>
  )
}
