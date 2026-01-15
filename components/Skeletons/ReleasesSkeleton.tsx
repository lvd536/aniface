import { Skeleton } from "../ui/skeleton";

const arr = new Array(3).fill(null);

export default function ReleasesSkeleton() {
    return (
        <ul className="flex flex-col justify-center gap-5 bg-stone-600/25 rounded-lg">
            {arr.map((_, index) => (
                <li
                    className="flex h-70 gap-3 items-center justify-start px-3 py-4 rounded-lg"
                    key={index}
                >
                    <Skeleton className="max-md:hidden w-47 h-full rounded-lg" />
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-40 h-3" />
                            <Skeleton className="w-30 h-2" />
                        </div>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex flex-wrap gap-2">
                                {arr.map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="flex items-center gap-2 w-10 h-2"
                                    />
                                ))}
                            </div>
                            <div className="flex gap-2 items-center">
                                <Skeleton className="w-10 h-2" />
                                <Skeleton className="block w-1 h-1 rounded-full" />
                                <Skeleton className="w-10 h-2" />
                                <Skeleton className="block w-1 h-1 rounded-full" />
                                <Skeleton className="w-5 h-2" />
                                <Skeleton className="block w-1 h-1 rounded-full" />
                                <Skeleton className="w-5 h-2" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-70 md:w-100 xl:w-150 h-2 mt-2" />
                            <Skeleton className="w-70 md:w-100 xl:w-150 h-2" />
                            <Skeleton className="w-70 md:w-100 xl:w-150 h-2" />
                            <Skeleton className="w-70 md:w-100 xl:w-150 h-2" />
                            <Skeleton className="w-70 md:w-100 xl:w-150 h-2" />
                            <Skeleton className="w-70 md:w-100 xl:w-150 h-2" />
                            <Skeleton className="w-70 md:w-100 xl:w-150 h-2" />
                            <Skeleton className="w-70 md:w-100 xl:w-150 h-2" />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
