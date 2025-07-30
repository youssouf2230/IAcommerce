import { DashboardActions } from "@/components/dashboard/dashboard-actions";
import { SectionCards } from "@/components/dashboard/section-cards";

const Page = () => {
    return (
        <div className="@container/dashboard" >
          
                <SectionCards />
                <DashboardActions/>
        </div>
    );
}

export default Page;
