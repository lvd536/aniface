import { Skeleton } from "../ui/skeleton";

export default function LatestAnimeSkeleton() {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton className="flex rounded-l-lg w-full h-25 p-2 bg-black/40 rounded-r-lg">
                <Skeleton className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex flex-col justify-between w-full h-full px-4 py-2">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-25 h-2" />
                        <Skeleton className="w-30 h-2" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Skeleton className="w-20 h-2" />
                        <Skeleton className="w-1 h-1 rounded-full" />
                        <Skeleton className="w-15 h-2" />
                    </div>
                </div>
            </Skeleton>
            <Skeleton className="flex rounded-l-lg w-full h-25 p-2 bg-black/40 rounded-r-lg">
                <Skeleton className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex flex-col justify-between w-full h-full px-4 py-2">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="w-25 h-2" />
                        <Skeleton className="w-30 h-2" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Skeleton className="w-20 h-2" />
                        <Skeleton className="w-1 h-1 rounded-full" />
                        <Skeleton className="w-15 h-2" />
                    </div>
                </div>
            </Skeleton>
        </div>
    );
}
