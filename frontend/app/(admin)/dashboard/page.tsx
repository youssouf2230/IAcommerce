import { OrdersByStatus } from "@/components/dashboard/charts/order-by-status";
import { SalesOvertime } from "@/components/dashboard/charts/sales-overtime";
import { SalesOverview } from "@/components/dashboard/charts/sales-overview";
import { DashboardActions } from "@/components/dashboard/dashboard-actions";
import { SectionCards } from "@/components/dashboard/section-cards";

const Page = () => {
    return (
        <div className="@container/dashboard" >
          
                <SectionCards />
                <div className="grid lg:grid-cols-2 grid-cols-1 my-10 gap-5  ">
                <DashboardActions/>
                <SalesOverview />
                <SalesOvertime/>
                <OrdersByStatus/>
                </div>
        </div>
    );
}

export default Page;
