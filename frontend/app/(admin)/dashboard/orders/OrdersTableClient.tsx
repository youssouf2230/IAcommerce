"use client";

import { generateColumns, Order } from "./columns";
import { DataTable } from "./data-table";

interface OrdersTableClientProps {
    data: Order[];
}

export function OrdersTableClient({ data }: OrdersTableClientProps) {
    const columns = generateColumns(data);
    return <DataTable columns={columns} data={data} />;
}
