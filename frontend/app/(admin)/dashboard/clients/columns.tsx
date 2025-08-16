"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash } from "lucide-react"
import { Client } from "@/types"
import { AlertDialogDelete } from "@/components/dashboard/dialogue-delete"





export const columns: ColumnDef<Client>[] = [

    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.getValue("id") as number

            return <span>{id}</span>
        },
    },
    {
        accessorKey: "username",
        header: "UserName",
        cell: ({ row }) => {
            const name = row.getValue("username") as string;
            return <span className="capitalize font-medium">{name}</span>;
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const email = row.getValue("email") as number;
            return <span>{email}</span>;
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
                              <DeleteButton/>  
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]




export function DeleteButton() {
    return (
        <AlertDialogDelete action={() => { console.log("is clicked form delte button") }}>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} variant="destructive">
                <Trash className=" h-4 w-4" />
                Delete
            </DropdownMenuItem>
        </AlertDialogDelete>
    )
}