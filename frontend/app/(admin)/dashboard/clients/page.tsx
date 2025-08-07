import { Suspense } from "react"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { FileDown, Plus } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import TableSkeleton from "@/components/shared/table-skeleton"
import { API_BASE_URL } from '@/lib/utils';
import { DataTable } from "./data-table"





export default async function Page() {
    const data = await axios.get(`${API_BASE_URL}/api/dashboard/clients`).then((res) => res.data);
    return (
        <div className="container mx-auto mt-12 p-6 ">
            <div className="my-6 flex  gap-4 justify-between">
                <h1 className="text-3xl font-semibold flex-1 ">Clinets</h1>
                <Button className="capitalize" size="sm" variant="outline"> <FileDown />  Export</Button>
            </div>
            <Suspense fallback={<TableSkeleton />}>
                <DataTable columns={columns} data={data} />
            </Suspense>
        </div>
    )
}