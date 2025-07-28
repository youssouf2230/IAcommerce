import { Suspense } from "react"
import { columns, Order } from "./columns"
import { DataTable } from "./data-table"

export async function getData(): Promise<Order[]> {
  return [
    {
      id: "ord_001",
      customerId: "cus_101",
      email: "alice@example.com",
      type: "express",
      status: "pending",
      totalAmount: 120.5,
      deliveryAddress: "123 Apple St, NY",
      deliveryInstructions: "Leave at front door.",
      createdAt: new Date("2025-07-25T09:00:00Z"),
      items: [
        { productId: "prod_1", quantity: 2, price: 50 },
        { productId: "prod_2", quantity: 1, price: 20.5 },
      ],
    },
    {
      id: "ord_002",
      customerId: "cus_102",
      email: "bob@example.com",
      type: "standard",
      status: "pending",
      totalAmount: 80,
      deliveryAddress: "456 Orange Ave, CA",
      deliveryInstructions: "",
      createdAt: new Date("2025-07-26T14:30:00Z"),
      items: [
        { productId: "prod_3", quantity: 1, price: 80 },
      ],
    },
    {
      id: "ord_003",
      customerId: "cus_103",
      email: "carla@example.com",
      type: "standard",
      status: "pending",
      totalAmount: 200,
      deliveryAddress: undefined, // Not needed for pickup
      deliveryInstructions: undefined,
      createdAt: new Date("2025-07-27T18:00:00Z"),
      items: [
        { productId: "prod_4", quantity: 4, price: 50 },
      ],
    },
  ]
}


export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto mt-12 ">
        <h1 className="text-3xl font-semibold my-6">Orders</h1>
        <Suspense fallback={<div>Loading...</div>}>

      <DataTable columns={columns} data={data} />
        </Suspense>
    </div>
  )
}