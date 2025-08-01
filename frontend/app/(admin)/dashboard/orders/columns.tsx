// "use client"

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash, Eye } from "lucide-react"
import { Product, User } from "@/types"

export interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    product: Product;
}

export interface Order {
    id: number;
    contactPhone: string;
    deliveryAddress: string;
    deliveryInstructions: string;
    status: boolean;
    total: number;
    date: string;
    items: OrderItem[];
    user?: User;
    sessionId?: string;
}

export function generateColumns(data: Order[]): ColumnDef<Order>[] {
    if (!data.length) return []
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();


    return [
        {
            accessorKey: "id",
            header: "Order ID",
            cell: ({ row }) => <span>{row.getValue("id")}</span>,
        },
        {
            accessorKey: "user.email",
            header: "Customer Email",
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {row.original.user?.email ?? "Anonymous"}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const isDelivered = row.getValue("status") as boolean;
                const label = isDelivered ? "Delivered" : "Pending";
                const variant = !isDelivered ? "success" : "secondary";

                return (
                    <Badge variant={variant} className="capitalize">
                        {label}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "total",
            header: "Amount",
            cell: ({ row }) => {
                const amount = row.getValue("total") as number;
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount);
                return <div className="font-medium">{formatted}</div>;
            },
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => {
                const date = new Date(row.getValue("date") as string | Date);
                return <div>{date.toLocaleDateString("en-US")}</div>;
            },
        },
        {
            accessorKey: "deliveryAddress",
            header: "Address",
            cell: ({ row }) => (
                <span>{row.getValue("deliveryAddress")}</span>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const order = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem
                                onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                Voir détails
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(order.id.toString())}
                            >
                                Copy Order ID
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Customer</DropdownMenuItem>
                            <DropdownMenuItem>View Order Details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}
