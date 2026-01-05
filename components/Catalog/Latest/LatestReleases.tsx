import AnimeCard from "@/components/AnimeCard/AnimeCard";
import { getLatestReleases } from "@/helpers/api";

export default async function LatestReleases() {
    const animeCatalog = await getLatestReleases();
    return (
        <div className="flex w-full min-h-screen items-center justify-center font-sans">
            <div className="flex flex-wrap items-center gap-2 sm:gap-5">
                {animeCatalog.map((anime) => (
                    <AnimeCard anime={anime} key={anime.id} />
                ))}
            </div>
        </div>
    );
}
