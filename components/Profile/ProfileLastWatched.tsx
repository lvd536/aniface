import { useStatsStore } from "@/stores/statsStore";
import LastWatchCard from "./LastWatchCard";

export default function ProfileLastWatched() {
    const { totalLastWatched } = useStatsStore();
    return (
        <div className="max-lg:w-full w-1/2 h-full bg-foreground/10 rounded-lg p-2">
            <h1 className="text-center text-lg font-semibold mb-2">
                Последнее просмотренное
            </h1>
            <div className="flex flex-col gap-2">
                {totalLastWatched.map((episode) => (
                    <LastWatchCard episode={episode} key={episode.episode.id} />
                ))}
            </div>
        </div>
    );
}
