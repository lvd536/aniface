import AnimeCard from "@/components/AnimeCard/AnimeCard";
import { getAnimeByGenre } from "@/helpers/api";

interface IProps {
    params: Promise<{ genre: number }>;
}

export default async function page({ params }: IProps) {
    const { genre } = await params;
    const animeList = await getAnimeByGenre(genre);
    if (!animeList) return <p>Error while fetching anime</p>;
    return (
        <div className="flex flex-wrap gap-4">
            {animeList.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
            ))}
        </div>
    );
}
