import { Skeleton } from "../components/ui/skeleton";

const array = new Array(6).fill(null);
export default function loading() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <Skeleton className="h-5 w-40" />
                <ul className="flex flex-wrap justify-between gap-4 mt-2">
                    {array.map((_, index) => (
                        <li
                            key={index}
                            className={index >= 3 ? "hidden sm:block" : "block"}
                        >
                            <Skeleton className="w-47 h-72" />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Skeleton className="h-5 w-40" />
                <ul className="flex flex-wrap justify-between gap-4 mt-2">
                    {array.map((_, index) => (
                        <li
                            key={index}
                            className={index >= 3 ? "hidden sm:block" : "block"}
                        >
                            <Skeleton className="w-47 h-72" />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Skeleton className="h-5 w-40" />
                <ul className="flex flex-wrap justify-between gap-4 mt-2">
                    {array.slice(0, 3).map((_, index) => (
                        <li
                            key={index}
                            className={index >= 3 ? "hidden sm:block" : "block"}
                        >
                            <Skeleton className="w-110 h-50" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
