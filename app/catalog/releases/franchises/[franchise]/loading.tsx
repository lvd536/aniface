import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <div className="flex flex-col gap-12">
            <div className="flex rounded-l-lg w-full p-4 bg-black/40 rounded-xl">
                <Skeleton className="w-40 h-40 rounded-lg" />
                <div className="flex flex-col h-40 justify-between w-full rounded-lg px-4 py-2">
                    <div className="flex flex-col gap-1">
                        <Skeleton className="w-30 h-3 bottom-6 z-1" />
                        <Skeleton className="hidden lg:block w-20 h-3" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <Skeleton className="w-40 h-3" />
                        </div>
                        <div className="lg:flex gap-2 items-center">
                            <Skeleton className="w-20 h-3" />
                            <Skeleton className="hidden lg:block w-1 h-1 rounded-full bg-foreground/50" />
                            <Skeleton className="w-25 h-3" />
                        </div>
                        <Skeleton className="w-35 h-3" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 justify-center p-4 bg-black/40 rounded-xl">
                <div className="max-lg:w-full h-35">
                    <div className="flex rounded-l-lg w-full">
                        <Skeleton className="w-35 h-35 rounded-lg" />
                        <div className="flex flex-col h-35 justify-between w-full rounded-lg px-4 py-2">
                            <div className="flex flex-col gap-1">
                                <Skeleton className="w-30 h-3 bottom-6 z-1" />
                                <Skeleton className="hidden lg:block w-20 h-3" />
                            </div>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                                <Skeleton className="w-10 h-2" />
                                <Skeleton className="w-1 h-1 mx-1 rounded-full" />
                                <Skeleton className="w-10 h-2" />
                                <Skeleton className="w-1 h-1 mx-1 rounded-full" />
                                <Skeleton className="w-10 h-2" />
                                <Skeleton className="w-1 h-1 mx-1 rounded-full" />
                                <Skeleton className="w-10 h-2" />
                                <Skeleton className="w-1 h-1 mx-1 rounded-full" />
                                <Skeleton className="w-10 h-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
