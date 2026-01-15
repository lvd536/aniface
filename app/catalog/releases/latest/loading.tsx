import { Skeleton } from "@/components/ui/skeleton";

const arr = new Array(28).fill(null);

export default function loading() {
    return (
        <div className="flex flex-wrap gap-4">
            {arr.map((_, index) => (
                <Skeleton className="w-47 h-72 rounded-lg" key={index} />
            ))}
        </div>
    );
}
