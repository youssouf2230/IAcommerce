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
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { OrderItem } from "@/types"

export const columns: ColumnDef<OrderItem>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue("id") as number
            return <span>{id}</span>
        },
    },
    {
        header: "Name",
        cell: ({ row }) => {
            const product = row.original.product
            return <span className="capitalize font-medium">{product.name}</span>
        },
    },
    {
        header: "Purchase Price",
        cell: ({ row }) => {
            const product = row.original.product
            return <span>{product.purchasePrice}</span>
        },
    },
    {
        header: "Sell Price",
        cell: ({ row }) => {
            const product = row.original.product
            return <span>{product.sellPrice}</span>
        },
    },
   

    {
        header: "Category",
        cell: ({ row }) => {
            const product = row.original.product
            return <span>{product.category?.name}</span>
        },
    },
    {
        header: "Quantity",
        accessorKey: "quantity",
    },
    {
        header: "Price ",
        accessorKey: "price",
         cell: ({ row }) => {
            const price = row.original.price
            return <span>{price } MAd</span>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="gap-4">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => {
                        navigator.clipboard.writeText(String(row.getValue("id")))
                    }}>
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="success">
                        <Pencil className="h-4 w-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Customer</DropdownMenuItem>
                    <DropdownMenuItem>View Order Details</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]
