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
import { CheckCircle, Eye, MoreHorizontal, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formattedPrice, getStatusStyles } from "@/lib/utils"
import Link from "next/link"
import { Order, OrderStatus } from "@/types"
import UpdateStatusBtn from "@/components/dashboard/update-status-btn"

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "Order ID",
        cell: ({ row }) => {
            const order_id = row.getValue("id") as number
            return <span>{order_id}</span>
        },
    },
    {
        accessorKey: "contactPhone",
        header: "Phone",
        cell: ({ row }) => {
            const phone = row.getValue("contactPhone") as string
            return <span className="font-semibold">{phone}</span>
        },
    },
    {
        accessorKey: "deliveryAddress",
        header: "Address",
        cell: ({ row }) => {
            const address = row.getValue("deliveryAddress") as string
            return <span className="line-clamp-1">{address}</span>
        },
    },
    {
        accessorKey: "deliveryInstructions",
        header: "Instructions",
        cell: ({ row }) => {
            const instructions = row.getValue("deliveryInstructions") as string
            return <span className="line-clamp-1 text-foreground/80">{instructions ? instructions : "N/A"}</span>
        },
    },
    {
        accessorKey: "user.email",
        header: "Customer Email",
        cell: ({ row }) => {
            const user = row.original.user
            return <span className="text-sm text-foreground/80">{user?.email ?? "N/A"}</span>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as OrderStatus
            return (
                <Badge className={`lowercase ${getStatusStyles(status)}`}>
                    {status || "PENDING"}
                </Badge>
            )
        },
    },
    {
        accessorKey: "total",
        header: "Amount",
        cell: ({ row }) => {
            const amount = row.getValue("total") as number

            return <div className="font-medium">{formattedPrice(amount)}</div>
        },
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const date = new Date(row.getValue("date") as string)
            return <div>{date.toLocaleDateString("en-US")}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const order = row.original
            const status = row.getValue("status") as OrderStatus

            return (
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="gap-6">
                        <DropdownMenuLabel >Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild variant="info">
                            <Link className="" href={`/dashboard/orders/${order.id}`}> <Eye className="text-inherit" />Details Order</Link>
                        </DropdownMenuItem>
                        {status === "PENDING" && (
                            <DropdownMenuItem  className="w-max"  variant="success" asChild>
                                <UpdateStatusBtn OrderId={order.id}  status={"CONFIRMED"} />
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem variant="destructive">
                            <Trash className="h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id.toString())}>
                            Copy Order ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Customer</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
