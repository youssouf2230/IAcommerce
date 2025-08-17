"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartWrapper } from "./chart-wrapper"

// Example "real" product sales data (replace with API response)
const chartData = [
  { product: "Laptop", sales: 120 },
  { product: "Phone", sales: 200 },
  { product: "Tablet", sales: 80 },
  { product: "Headphones", sales: 150 },
  { product: "Camera", sales: 90 },
]

const chartConfig = {
  sales: {
    label: "Units Sold",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function SalesOverview() {
  return (
    <ChartWrapper
      title="Product Sales Overview"
      description="Top selling products"
     
      className=" "
    >
      <ChartContainer config={chartConfig}>
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="product" tickLine={false} axisLine={false} />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
        </BarChart>
      </ChartContainer>
    </ChartWrapper>
  )
}
