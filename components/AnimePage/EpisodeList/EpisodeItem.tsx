import { browserRoutes } from "@/consts/browserRoutes";
import Link from "next/link";
import Image from "next/image";
import { apiRoutes } from "@/consts/apiRoutes";
import { WatchedEpisode } from "@/types/db.types";
import NoImage_16x9 from "@/public/NoImage_16x9.png";

interface IProps {
    image: string;
    id: string;
    duration: number;
    name: string;
    ordinal: number;
    watchedEpisodeData?: WatchedEpisode;
}

async function getSafeImageUrl(url: string) {
    try {
        const res = await fetch(url, { method: "HEAD", cache: "no-store" });
        return res.ok ? url : NoImage_16x9;
    } catch {
        return NoImage_16x9;
    }
}

export default async function EpisodeItem({
    id,
    name,
    ordinal,
    image,
    duration,
    watchedEpisodeData,
}: IProps) {
    function getMsFromSeconds(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds}`;
    }
    const linkUrl = watchedEpisodeData
        ? `${id}?startFrom=${watchedEpisodeData.watched_time}`
        : id;
    return (
        <Link
            href={browserRoutes.anime.episode(linkUrl)}
            key={id}
            className="relative w-80 h-40 rounded-lg"
        >
            <Image
                src={await getSafeImageUrl(apiRoutes.image(image))}
                alt="Episode poster"
                width={1920}
                height={1080}
                loading="lazy"
                className="w-80 h-40 rounded-lg object-cover"
            />
            <div className="absolute flex top-0 left-0 w-full h-full items-end justify-between backdrop-blur-xs bg-black/65 rounded-lg">
                {watchedEpisodeData && (
                    <div className="absolute flex w-full self-start items-start justify-between p-3">
                        <p className="text-xs p-2 bg-green-500/20 rounded-lg">
                            Просмотрен
                        </p>
                        <p className="text-xs p-2 bg-stone-500/20 rounded-lg">
                            {getMsFromSeconds(watchedEpisodeData.watched_time)}
                        </p>
                    </div>
                )}
                <div className="flex w-full justify-between items-center p-3">
                    <div>
                        <p className="text-xs text-foreground/50">{name}</p>
                        <p className="text-sm font-bold">{`${ordinal} Эпизод`}</p>
                    </div>
                    <p className="text-xs p-2 bg-black/40 rounded-lg">
                        {getMsFromSeconds(duration)}
                    </p>
                </div>
            </div>
        </Link>
    );
}
