import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <div className="fixed left-0 top-0 w-screen h-screen flex flex-col gap-5 bg-background items-center justify-center z-5">
            <Skeleton className="fixed left-30 top-2 flex items-center justify-start p-2 rounded-lg gap-3 bg-black/50 z-50">
                <Skeleton className="w-10 h-10"></Skeleton>
                <div>
                    <Skeleton className="w-20 h-2 mb-1" />
                    <Skeleton className="w-15 h-2" />
                </div>
                <Skeleton className="w-1.5 h-1.5" />
                <Skeleton className="w-20 h-2" />
            </Skeleton>
            <Skeleton className="w-screen h-screen" />
        </div>
    );
}
