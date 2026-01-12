import { useStatsStore } from "@/stores/statsStore";
import CircleChart from "@/components/CircleChart";

export default function ProfileStats() {
    const { totalEpisodes, topGenres, totalSeconds, totalTitles } =
        useStatsStore();
    const formatSeconds = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        if (hours > 0) {
            return `${hours} ч. ${minutes} мин.`;
        }
        return `${minutes} мин.`;
    };
    return (
        <div className="max-lg:w-full w-1/2 h-full bg-foreground/15 justify-between rounded-lg p-2">
            <h1 className="text-center text-lg font-semibold mb-2">
                Ваша статистика
            </h1>
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-medium">
                        Просмотрено тайтлов: {totalTitles}
                    </p>
                    <p className="text-sm font-medium">
                        Общее время просмотра: {formatSeconds(totalSeconds)}
                    </p>
                    <p className="text-sm font-medium">
                        Серий просмотрено: {totalEpisodes}
                    </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <h3 className="text-sm font-medium">Любимые жанры</h3>
                    <CircleChart
                        data={topGenres.map((genre) => ({
                            name: genre.genre,
                            value: genre.cnt,
                        }))}
                    />
                </div>
            </div>
        </div>
    );
}
