"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartWrapper } from "./chart-wrapper"

// 🧪 Dummy product sales data
const chartData = [
  { month: "January", sales: 120 },
  { month: "February", sales: 200 },
  { month: "March", sales: 180 },
  { month: "April", sales: 90 },
  { month: "May", sales: 250 },
  { month: "June", sales: 300 },
]

const chartConfig = {
  sales: {
    label: "Units Sold",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function SalesOvertime() {
  return (
    <ChartWrapper
      title=" Sales Over Time"
      description="Sales over last 6 months"
      className=""
    >
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="sales"
            type="natural"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </ChartWrapper>
  )
}
