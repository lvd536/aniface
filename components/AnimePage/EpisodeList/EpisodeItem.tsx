"use client";
import { browserRoutes } from "@/consts/browserRoutes";
import Link from "next/link";
import Image from "next/image";
import { apiRoutes } from "@/consts/apiRoutes";
import { WatchedEpisode } from "@/types/db.types";
import { markEpisodeAsWatched } from "@/helpers/supabase";
import { Episode } from "@/types/api.types";
import { createClient } from "@/lib/supabase/client";
import { CheckCheck } from "lucide-react";

interface IProps {
    episode: Episode;
    watchedEpisodeData?: WatchedEpisode;
}

export default function EpisodeItem({ episode, watchedEpisodeData }: IProps) {
    function getMsFromSeconds(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds}`;
    }
    const linkUrl = watchedEpisodeData
        ? `${episode.id}?startFrom=${watchedEpisodeData.watched_time}`
        : episode.id;

    const client = createClient();

    const handleMarkAsWatched = () => {
        markEpisodeAsWatched(
            episode.id.toString(),
            episode.ordinal,
            episode.release_id.toString(),
            Math.round(episode.duration),
            client
        );
    };

    return (
        <Link
            href={browserRoutes.anime.episode(linkUrl)}
            key={episode.id}
            className="relative w-80 h-40 rounded-lg"
        >
            <Image
                src={apiRoutes.image(episode.preview.src)}
                alt="Episode poster"
                width={1920}
                height={1080}
                loading="lazy"
                className="w-80 h-40 rounded-lg object-cover"
            />
            <div className="absolute flex top-0 left-0 w-full h-full items-end justify-between backdrop-blur-xs bg-black/65 rounded-lg">
                {watchedEpisodeData ? (
                    <div className="absolute flex w-full self-start items-start justify-between p-3">
                        <p className="text-xs p-2 bg-green-500/20 rounded-lg">
                            Просмотрен
                        </p>
                        <p className="text-xs p-2 bg-stone-500/20 rounded-lg">
                            {getMsFromSeconds(watchedEpisodeData.watched_time)}
                        </p>
                    </div>
                ) : (
                    <CheckCheck
                        width={30}
                        height={30}
                        className="absolute top-3 right-3 p-1 bg-indigo-500/20 stroke-foreground/50 hover:stroke-foreground hover:bg-indigo-500 transition-[bg, stroke] duration-300 rounded-lg z-50"
                        onClick={handleMarkAsWatched}
                    />
                )}
                <div className="flex w-full justify-between items-center p-3">
                    <div>
                        <p className="text-xs text-foreground/50">
                            {episode.name}
                        </p>
                        <p className="text-sm font-bold">{`${episode.ordinal} Эпизод`}</p>
                    </div>
                    <p className="text-xs p-2 bg-black/40 rounded-lg">
                        {getMsFromSeconds(episode.duration)}
                    </p>
                </div>
            </div>
        </Link>
    );
}
