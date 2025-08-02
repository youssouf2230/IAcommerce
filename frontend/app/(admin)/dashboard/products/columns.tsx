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
import { MoreHorizontal, RatIcon, Star, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Product, Category } from "@/types"





export const columns: ColumnDef<Product>[] = [

    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue("id") as number

            return <span>{id}</span>
        },
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name = row.getValue("name") as string;
            return <span className="capitalize font-medium">{name}</span>;
        },
    },
    {
        accessorKey: "purchasePrice",
        header: "Purchase Price",
        cell: ({ row }) => {
            const purchasePrice = row.getValue("purchasePrice") as number;
            return <span>{purchasePrice}</span>;
        },
    },
    {
        accessorKey: "sellPrice",
        header: "Sell Price",
        cell: ({ row }) => {
            const sellPrice = row.getValue("sellPrice") as number;
            return <span>{sellPrice}</span>;
        },
    },
    {
        accessorKey: "oldPrice",
        header: "Old Price",
        cell: ({ row }) => {
            const oldPrice = row.getValue("oldPrice") as number;
            return <span>{oldPrice}</span>;
        },
    },
    {
        accessorKey: "stockQuantity",
        header: "Stock Quantity",
        cell: ({ row }) => {
            const stockQuantity = row.getValue("stockQuantity") as number;
            return <span>{stockQuantity}</span>;
        },
    },
   
 
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => {
            const rating = row.getValue("rating") as number;
            return <span className="bg-amber-200/20 px-1.5 py-0.5   rounded-full text-xs text-amber-500 flex w-max items-center gap-0.5 font-semibold">{rating} <Star size={11}/> </span>;
        },
    },
    {
        accessorKey: "numberOfComments",
        header: "Number of Comments",
        cell: ({ row }) => {
            const numberOfComments = row.getValue("numberOfComments") as number;
            return <span>{numberOfComments}</span>;
        },
    },
    {
        accessorKey: "numberOfLiked",
        header: "Number of Likes",
        cell: ({ row }) => {
            const numberOfLiked = row.getValue("numberOfLiked") as number;
            return <span>{numberOfLiked}</span>;
        },
    },
   
  
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => {
            const date = row.getValue("date") as string;
            return <span>{date}</span>;
        },
    },

    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.getValue("category") as Category;
            return <span>{category.name}</span>; // Assuming Category has a 'name' property. Adjust accordingly.
        },
    },

    {
        id: "actions",
        cell: ({ row }) => {


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
                        <DropdownMenuItem  onClick={() => { navigator.clipboard.writeText(row.getValue("id") as string) }}>
                            
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                            <Trash className=" h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="success">
                            <Trash className=" h-4 w-4" />
                            Edit
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

