import { Skeleton } from "../ui/skeleton";
import LatestAnimeSkeleton from "./LatestAnimeSkeleton";

export default function ProfileSkeleton() {
    return (
        <div className="flex flex-col gap-4 p-2">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <Skeleton className="p-2 ring ring-indigo-500 w-12 h-12 rounded-full" />
                    <div className="flex flex-col gap-1">
                        <Skeleton className="w-12 h-3" />
                        <Skeleton className="w-14 h-2" />
                    </div>
                </div>
                <div className="flex gap-2">
                    <Skeleton className="p-1.5 rounded-md bg-foreground/20 w-7 h-7" />
                    <Skeleton className="p-1.5 rounded-md bg-foreground/20 w-7 h-7" />
                    <Skeleton className="p-1.5 rounded-md bg-foreground/20 w-7 h-7" />
                </div>
            </div>
            <div className="flex max-lg:flex-col w-full gap-2 justify-between">
                <Skeleton className="max-lg:w-full w-1/2 h-full bg-foreground/15 justify-between rounded-lg p-2">
                    <Skeleton className="w-25 h-3 mb-5 mx-auto" />
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-20 md:w-60 h-2.5" />
                            <Skeleton className="w-30 md:w-70 h-2.5" />
                            <Skeleton className="w-20 md:w-60 h-2.5" />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Skeleton className="w-20 h-2.5" />
                            <Skeleton className="w-30 h-30 rounded-full" />
                        </div>
                    </div>
                </Skeleton>
                <Skeleton className="max-lg:w-full w-1/2 h-full bg-foreground/10 rounded-lg p-2">
                    <Skeleton className="text-center text-lg font-semibold mb-2" />
                    <LatestAnimeSkeleton />
                </Skeleton>
            </div>
        </div>
    );
}
