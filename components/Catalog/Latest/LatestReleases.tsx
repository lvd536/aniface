import AnimeCard from "@/components/AnimeCard/AnimeCard";
import { getLatestReleases } from "@/helpers/api";

export default async function LatestReleases() {
    const animeCatalog = await getLatestReleases();
    return (
        <div className="flex min-h-screen items-center justify-center font-sans">
            <div className="grid grid-cols-1 xs:grid-cols-[repeat(2,200px)] sm:grid-cols-[repeat(5,1fr)] gap-5">
                {animeCatalog.map((anime) => (
                    <AnimeCard anime={anime} key={anime.id} />
                ))}
            </div>
        </div>
    );
}
