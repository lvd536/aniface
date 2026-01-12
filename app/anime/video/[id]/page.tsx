"use server";
import { browserRoutes } from "@/consts/browserRoutes";
import { getAnime, getEpisode } from "@/helpers/api";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { checkUserTitleExists } from "@/helpers/supabase";
import { createClient } from "@/lib/supabase/server";
import Player from "@/components/AnimePage/Video/Player";
interface IProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page({ params, searchParams }: IProps) {
    const { id } = await params;
    const sParams = await searchParams;
    const startFrom = sParams.startFrom ? Number(sParams.startFrom) : undefined;

    const episode = await getEpisode(id);
    const anime = await getAnime(episode.release.id.toString());
    const client = await createClient();
    await checkUserTitleExists(anime, client, true);
    return (
        <div className="fixed left-0 top-0 w-screen h-screen flex flex-col gap-5 bg-background items-center justify-center z-5">
            <div className="fixed left-30 top-2 flex items-center justify-start p-2 rounded-lg gap-3 bg-black/50 z-50">
                <Link
                    href={browserRoutes.anime.title(episode.release.id)}
                    className="p-2 rounded-lg bg-foreground/15"
                >
                    <ArrowLeft width={20} height={20} />
                </Link>
                <div>
                    <p className="font-bold text-sm">
                        {episode.release.name.main}
                    </p>
                    <p className="text-xs text-foreground/50">
                        {episode.release.name.english}
                    </p>
                </div>
                <span className="w-1.5 h-1.5 bg-foreground/80 rounded-full" />
                <p className="font-bold text-md">{`${episode.ordinal} Эпизод`}</p>
            </div>
            <Player
                animeId={anime.id}
                episodeId={episode.id}
                episodeNumber={episode.ordinal}
                episodesTotal={anime.episodes.length}
                qualitiesSrc={{
                    hls_480: episode.hls_480,
                    hls_720: episode.hls_720,
                    hls_1080: episode.hls_1080,
                }}
                startFrom={startFrom}
            />
        </div>
    );
}
