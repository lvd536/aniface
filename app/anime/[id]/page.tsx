import AnimeInfo from "@/components/AnimePage/AnimeInfo/AnimeInfo";
import EpisodeList from "@/components/AnimePage/EpisodeList/EpisodeList";
import { getAnime } from "@/helpers/api";
import {
    checkAnimeExists,
    checkUserTitleExists,
    getWatchedEpisodes,
} from "@/helpers/supabase";
import { createClient } from "@/lib/supabase/server";
import { WatchedEpisodes } from "@/types/db.types";
interface IProps {
    params: Promise<{ id: string }>;
}

export default async function page({ params }: IProps) {
    const { id } = await params;
    const anime = await getAnime(id);
    const client = await createClient();
    const isUserValid = await checkAnimeExists(anime, client, true);
    const watchedEpisodes: WatchedEpisodes | undefined = isUserValid
        ? await getWatchedEpisodes(anime.id.toString(), client)
        : undefined;
    await checkUserTitleExists(anime, client, true);
    return (
        <div className="w-full h-full flex flex-col gap-2">
            <AnimeInfo anime={anime} />
            <EpisodeList
                episodes={anime.episodes}
                watchedEpisodes={watchedEpisodes}
            />
        </div>
    );
}
