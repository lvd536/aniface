import AnimeInfo from "@/components/AnimePage/AnimeInfo/AnimeInfo";
import EpisodeList from "@/components/AnimePage/EpisodeList/EpisodeList";
import { getAnime } from "@/helpers/api";
import { checkAnimeExists } from "@/helpers/supabase";
import { createClient } from "@/lib/supabase/server";
interface IProps {
    params: Promise<{ id: string }>;
}

export default async function page({ params }: IProps) {
    const { id } = await params;
    const anime = await getAnime(id);
    const client = await createClient();
    await checkAnimeExists(anime, client, true);
    return (
        <div className="w-full h-full flex flex-col gap-2">
            <AnimeInfo anime={anime} />
            <EpisodeList episodes={anime.episodes} />
        </div>
    );
}
