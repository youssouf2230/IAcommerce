import { cookies } from "next/headers";
import { Suspense } from "react";

import TableSkeleton from "@/components/shared/table-skeleton";

import { API_BASE_URL } from "@/lib/utils";
import { Order } from "@/types";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export async function getOrders(): Promise<Order[]> {

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${API_BASE_URL}/api/dashboard/orders`, {
        headers: {
            Cookie: `token=${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch orders");
    }

    return await res.json();
}

export default async function OrdersPage() {
    const data = await getOrders();

    return (
        <div className="container mx-auto mt-12">
            <h1 className="text-3xl font-semibold my-6">Orders</h1>
            <Suspense fallback={<TableSkeleton />}>
                <DataTable columns={columns} data={data} />
            </Suspense>
        </div>
    );
}
