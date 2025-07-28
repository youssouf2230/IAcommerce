"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"




export interface OrderItem {
    productId: string
    quantity: number
    price: number
}

export interface Order {
    id: string
    customerId: string
    type: OrderType
    email: string
    items: OrderItem[]
    totalAmount: number
    deliveryAddress?: string
    deliveryInstructions?: string
    scheduledDate?: Date
    createdAt: Date
    status: OrderStatus
}
type OrderStatus = "pending" | "shipped" | "delivered"
type OrderType = "standard" | "express"
export const columns: ColumnDef<Order>[] = [

    {
        accessorKey: "id",
        header: "Order ID",
        cell: ({ row }) => {
            const order_id = row.getValue("id") as string

            return <span>{order_id}</span>
        },
    },

    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const type = row.getValue("type") as OrderType

            return <span className="capitalize">{type}</span>
        },
    },

    {
        accessorKey: "email",
        header: "Customer Email",
        cell: ({ row }) => {
            const email = row.getValue("email")
            return <span className="text-sm text-muted-foreground ">
                {email as string}
            </span>
        },
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as OrderStatus


            return (
                <Badge

                    variant="success"


                    className={` capitalize`}
                >
                    {status || "pending"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "totalAmount",
        header: () => <div className="">Amount</div>,
        cell: ({ row }) => {
            const amount = row.getValue("totalAmount") as number
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div className=" font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("createdAt") as string | Date)
            return <div>{date.toLocaleDateString("en-US")}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="gap-4">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>
                            Copy Order ID
                        </DropdownMenuItem>


                        <DropdownMenuItem variant="destructive">
                            <Trash className=" h-4 w-4" />
                            Delete
                        </DropdownMenuItem>


                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Customer</DropdownMenuItem>
                        <DropdownMenuItem>View Order Details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
