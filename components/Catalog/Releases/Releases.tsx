import AnimeCard from "@/components/AnimeCard/AnimeCard";
import { getCatalog } from "@/helpers/api";

export default async function Releases() {
    const animeCatalog = await getCatalog();
    return (
        <div className="flex min-h-screen items-center justify-center font-sans">
            <div className="grid grid-cols-1 xs:grid-cols-[repeat(2,200px)] sm:grid-cols-[repeat(5,1fr)] gap-5">
                {animeCatalog.data.map((anime) => (
                    <AnimeCard anime={anime} key={anime.id} />
                ))}
            </div>
        </div>
    );
}
