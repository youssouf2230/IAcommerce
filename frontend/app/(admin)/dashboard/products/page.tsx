import { Suspense } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { FileDown, Plus } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import TableSkeleton from "@/components/shared/table-skeleton"
import { API_BASE_URL } from '@/lib/utils';





export default async function Page() {
  const data = await axios.get(`${API_BASE_URL}/api/dashboard/products`).then((res) => res.data);
  return (
    <div className="container mx-auto mt-12 ">
      <div className="my-6 flex  gap-4 justify-between">

        <h1 className="text-3xl font-semibold flex-1 ">Products</h1>

        <Button className="capitalize" size="sm" variant="outline"> <FileDown />  Export</Button>
        <Button className="capitalize" size="sm">  <Plus />  <Link href="products/add">add product</Link>  </Button>


      </div>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable columns={columns} data={data.content} />
      </Suspense>
    </div>
  )
}