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
            <Player
                animeId={anime.id}
                isOngoing={anime.is_ongoing}
                episode={episode}
                episodes={anime.episodes}
                startFrom={startFrom}
            />
        </div>
    );
}
