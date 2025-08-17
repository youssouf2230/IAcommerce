"use client"

import { Pie, PieChart, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartWrapper } from "./chart-wrapper"

const orderData = [
  { status: "Pending", value: 40 },
  { status: "Shipped", value: 120 },
  { status: "Delivered", value: 300 },
  { status: "Cancelled", value: 20 },
]

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"]

export function OrdersByStatus() {
  return (
    <ChartWrapper
      title="Orders by Status"
      description="Current distribution of orders"
    >
      <ChartContainer config={{}}>
        <PieChart>
          <Pie
            data={orderData}
            dataKey="value"
            nameKey="status"
            outerRadius={90}
            label
          >
            {orderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ChartContainer>
    </ChartWrapper>
  )
}
