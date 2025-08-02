

import { Suspense } from "react"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import TableSkeleton from "@/components/shared/table-skeleton"
import { Order } from "@/types"
import axios from "axios"
import { API_BASE_URL, formattedPrice, getStatusStyles } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default async function Page({ params }: { params: { orderId: string | number } }) {
  const { orderId } = params
  const order: Order = await axios
    .get(`${API_BASE_URL}/api/dashboard/orders/${orderId}`)
    .then((res) => res.data)

  const Items = order.items

  return (
    <div className="px-4 md:px-8  mt-12 @container ">
      {order.status === "PENDING" || order.status === "PROCESSING" &&
        <Button
          className="mb-4 font-medium"
          variant="success"
        >
          <CheckCircle className="size-5 " />
          Confirm Order
        </Button>

      }
      <div className="flex flex-col  @md:flex-row @md:items-center @md:justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
        <span className="text-lg font-semibold mt-2 md:mt-0 success px-4 py-1 rounded ">
          Total: {formattedPrice(order.total)}
        </span>
      </div>

      <Card className="bg-card/50 border-muted-foreground/40 border  shadow-sm mb-8">
        <CardContent className=" space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold">Order #{order.id}</h2>
            <Badge variant="outline" className={getStatusStyles(order.status)}>
              {order.status}
            </Badge>
          </div>

          <div className="flex flex-wrap justify-between gap-6 text-sm">
            <div>
              <p className="text-muted-foreground font-medium mb-1">Total</p>
              <p className="font-medium text-base">{formattedPrice(order.total)} MAD</p>
            </div>

            <div>
              <p className="text-muted-foreground font-medium mb-1">Date</p>
              <p className="font-medium text-base">{order.date}</p>
            </div>

            <div>
              <p className="text-muted-foreground font-medium mb-1">Contact Phone</p>
              <p className="font-medium text-base">{order.contactPhone}</p>
            </div>

            <div>
              <p className="text-muted-foreground font-medium mb-1">Delivery Address</p>
              <p className="font-medium text-base">{order.deliveryAddress}</p>
              {order.deliveryInstructions && (
                <p className="text-sm italic text-muted-foreground mt-1">
                  {order.deliveryInstructions}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Ordered Items</h2>
      <Suspense fallback={<TableSkeleton />}>
        <DataTable columns={columns} data={Items} />
      </Suspense>
    </div>
  )
}
