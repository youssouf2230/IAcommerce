import { Suspense, type ReactNode } from "react";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import { API_BASE_URL } from "@/lib/utils";
import TableSkeleton from "@/components/shared/table-skeleton";
import { DataTable } from "./data-table";

// Updated props interface
interface ResourceListPageProps<TData, TValue> {
  title: string;
  apiEndpoint: string;
  columns: ColumnDef<TData, TValue>[];
  dataKey?: string;
  actions?: ReactNode;
}

export default async function ResourceListPage<TData, TValue>({
  title,
  apiEndpoint,
  columns,
  dataKey = 'content',
  actions, 
}: ResourceListPageProps<TData, TValue>) {

  const response = await axios.get(`${API_BASE_URL}${apiEndpoint}`).then((res) => res.data);
  const data = response[dataKey] || [];

  return (
    <div className="container mx-auto mt-12">
      <div className="my-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">{title}</h1>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}