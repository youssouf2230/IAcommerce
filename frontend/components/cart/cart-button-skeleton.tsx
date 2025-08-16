import { Skeleton } from "@/components/ui/skeleton";

export const CartButtonSkeleton = () => {
    return (
        <div className="relative size-7 rounded-full">
            <Skeleton className="w-full h-full rounded-md" />
            <Skeleton className="absolute bg-red-200 -top-2 -right-2 w-4 h-4 rounded-full" />
        </div>
    );
};
