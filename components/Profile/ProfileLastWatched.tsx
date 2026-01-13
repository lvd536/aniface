import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { useStatsStore } from "@/stores/statsStore";
import Image from "next/image";
import Link from "next/link";

const formatSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours} ч. ${minutes} мин.`;
    }
    return `${minutes} мин.`;
};

export default function ProfileLastWatched() {
    const { totalLastWatched } = useStatsStore();
    return (
        <div className="max-lg:w-full w-1/2 h-full bg-foreground/10 rounded-lg p-2">
            <h1 className="text-center text-lg font-semibold mb-2">
                Последнее просмотренное
            </h1>
            <div className="flex flex-col gap-2">
                {totalLastWatched.map((episode) => (
                    <Link
                        href={browserRoutes.anime.title(
                            episode.episode.release.id
                        )}
                        className="flex rounded-l-lg w-full h-25 p-2 bg-black/40 rounded-r-lg"
                        key={episode.episode.id}
                    >
                        <Image
                            src={apiRoutes.image(
                                episode.episode.release.poster.preview
                            )}
                            alt="anime poster"
                            height={1080}
                            width={1080}
                            className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex flex-col justify-between w-full h-full px-4 py-2">
                            <div>
                                <h3 className="text-xs lg:text-sm font-semibold bottom-6 z-1">
                                    {episode.episode.release.name.main}
                                </h3>
                                <p className="block text-xs text-foreground/60 font-medium">
                                    {episode.episode.release.name.english}
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                                {episode.episode.name && (
                                    <>
                                        <p className="text-xs text-foreground font-medium">
                                            {`Серия: ${episode.episode.name}`}
                                        </p>
                                        <div className="block w-1 h-1 rounded-full bg-foreground/50" />
                                    </>
                                )}
                                <p className="text-xs text-foreground/70 font-medium">
                                    {`Тайминг: ${formatSeconds(
                                        episode.stopTime
                                    )}`}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
