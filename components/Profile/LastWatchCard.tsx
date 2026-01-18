import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { EpisodeResponse } from "@/types/api.types";
import Link from "next/link";
import imagePlaceholder from "@/public/8x8.png";
import ImageWithFallback from "@/components/ImageWithFallback";

interface IProps {
    episode: {
        episode: EpisodeResponse;
        stopTime: any;
    };
}

const formatSeconds = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
        return `${hours} ч. ${minutes} мин.`;
    }
    return `${minutes} мин.`;
};

export default function LastWatchCard({ episode }: IProps) {
    return (
        <Link
            href={browserRoutes.anime.title(episode.episode.release.id)}
            className="flex rounded-l-lg w-full h-25 p-2 bg-black/40 rounded-r-lg"
        >
            <ImageWithFallback
                src={apiRoutes.image(episode.episode.release.poster.preview)}
                alt="anime poster"
                height={1080}
                width={1080}
                className="w-20 h-20 rounded-lg object-cover"
                fallbackSrc={imagePlaceholder}
            />
            <div className="flex flex-col justify-between w-full h-full px-4 py-2">
                <div>
                    <h3 className="max-sm:line-clamp-1 text-xs lg:text-sm font-semibold bottom-6 z-1">
                        {episode.episode.release.name.main}
                    </h3>
                    <p className="block max-sm:line-clamp-1 text-xs text-foreground/60 font-medium">
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
                        {`Тайминг: ${formatSeconds(episode.stopTime)}`}
                    </p>
                </div>
            </div>
        </Link>
    );
}
