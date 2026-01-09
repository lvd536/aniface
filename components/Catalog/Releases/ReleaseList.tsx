import ReleaseCard from "./ReleaseCard";
import { useFilterStore } from "@/types/filterStore";

export default function ReleaseList() {
    const { animeList } = useFilterStore();
    return (
        <>
            {animeList && (
                <ul className="flex flex-col justify-center gap-5 bg-stone-600/25 rounded-lg">
                    {animeList.data.map((anime) => (
                        <ReleaseCard release={anime} key={anime.id} />
                    ))}
                </ul>
            )}
        </>
    );
}
