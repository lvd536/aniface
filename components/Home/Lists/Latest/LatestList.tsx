import { getLatestReleases } from "@/helpers/api";
import LatestCard from "./LatestCard";
export default async function LatestList() {
    const latestAnime = await getLatestReleases(6);
    return (
        <ul className="grid grid-cols-3 xl:grid-cols-6 justify-between gap-4 mt-2">
            {latestAnime.map((anime) => (
                <LatestCard key={anime.id} anime={anime} />
            ))}
        </ul>
    );
}
