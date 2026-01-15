import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
    return (
        <Skeleton className="flex flex-col gap-4">
            <Skeleton className="flex items-center justify-between">
                <Skeleton>
                    <Skeleton className="p-2 ring ring-indigo-500 w-12 h-12 rounded-full" />
                    <Skeleton>
                        <Skeleton className="w-10" />
                        <Skeleton className="w-12" />
                    </Skeleton>
                </Skeleton>
                <Skeleton></Skeleton>
            </Skeleton>
            <Skeleton className="flex max-lg:flex-col w-full gap-2 justify-between">
                <Skeleton className="p-1.5 rounded-md bg-foreground/20 w-7 h-7" />
                <Skeleton className="p-1.5 rounded-md bg-foreground/20 w-7 h-7" />
                <Skeleton className="p-1.5 rounded-md bg-foreground/20 w-7 h-7" />
            </Skeleton>
        </Skeleton>
    );
}
