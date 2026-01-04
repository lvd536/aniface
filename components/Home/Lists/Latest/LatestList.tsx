import { getLatestReleases } from "@/helpers/api";
import AnimeCard from "@/components/AnimeCard/AnimeCard";
export default async function LatestList() {
    const latestAnime = await getLatestReleases(6);
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 justify-between gap-4 mt-2">
            {latestAnime.map((anime, index) => (
                <li
                    key={anime.id}
                    className={index >= 3 ? "hidden sm:block" : "block"}
                >
                    <AnimeCard anime={anime} />
                </li>
            ))}
        </ul>
    );
}
