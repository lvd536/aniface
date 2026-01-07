import AnimeCard from "@/components/AnimeCard/AnimeCard";
import { getCatalog } from "@/helpers/api";
import ReleaseCard from "./ReleaseCard";

interface IProps {
    page: number;
}

export default async function Releases({ page }: IProps) {
    const animeCatalog = await getCatalog(page);
    return (
        <div className="flex flex-col min-h-screen items-center justify-between gap-5">
            <div className="flex flex-wrap justify-center gap-5 bg-foreground/15 rounded-lg">
                {animeCatalog.data.map((anime) => (
                    <ReleaseCard release={anime} key={anime.id} />
                ))}
            </div>
        </div>
    );
}
