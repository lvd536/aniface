import { Skeleton } from "@/components/ui/skeleton";

const arr = new Array(6).fill(null);

export default function loading() {
    return (
        <div>
            <>
                <div className="flex max-sm:flex-col gap-2 sm:gap-5">
                    <Skeleton className="w-80 h-100 rounded-sm" />
                    <div className="flex flex-col gap-1">
                        <Skeleton className="w-45 h-4" />
                        <Skeleton className="w-35 h-4" />
                        <div className="flex text-xs items-center gap-2 my-2">
                            <Skeleton className="w-10 h-5 rounded-lg" />
                            <Skeleton className="w-15 h-5 rounded-lg" />
                        </div>

                        <Skeleton className="w-20 h-3 mb-1" />
                        <Skeleton className="w-25 h-3 mb-1" />
                        <Skeleton className="w-30 h-3 mb-1" />
                        <Skeleton className="w-35 h-3 mb-1" />
                        <Skeleton className="w-40 h-3 mb-1" />
                        <Skeleton className="w-45 h-3" />
                        <div className="flex gap-2 mt-2">
                            <Skeleton className="w-30 h-8" />
                            <Skeleton className="w-30 h-8" />
                            <Skeleton className="w-30 h-8" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                    <Skeleton className="w-full h-3" />
                    <Skeleton className="w-full h-3" />
                    <Skeleton className="w-full h-3" />
                    <Skeleton className="w-full h-3" />
                </div>
                <div className="flex flex-wrap gap-2 p-2 bg-foreground/10 items-center justify-center rounded-lg mt-2">
                    {arr.map((_, index) => (
                        <div
                            className="relative w-80 h-40 rounded-lg"
                            key={index}
                        >
                            <Skeleton className="absolute flex top-0 left-0 w-full h-full items-end justify-between rounded-lg">
                                <div className="flex w-full justify-between items-center p-3">
                                    <div className="flex flex-col gap-1">
                                        <Skeleton className="w-25 h-3" />
                                        <Skeleton className="w-20 h-3" />
                                    </div>
                                    <Skeleton className="w-10 h-7 rounded-lg" />
                                </div>
                            </Skeleton>
                        </div>
                    ))}
                </div>
            </>
        </div>
    );
}
