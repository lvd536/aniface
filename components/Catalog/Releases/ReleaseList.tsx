import { CatalogAnime } from "@/types/api.types";
import ReleaseCard from "./ReleaseCard";

interface IProps {
    releases: CatalogAnime[];
}

export default function ReleaseList({ releases }: IProps) {
    return (
        <ul className="flex flex-col justify-center gap-5 bg-stone-600/25 rounded-lg">
            {releases.map((anime) => (
                <ReleaseCard release={anime} key={anime.id} />
            ))}
        </ul>
    );
}
