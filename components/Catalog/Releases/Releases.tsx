import ReleaseCard from "./ReleaseCard";
import { CatalogAnime, CatalogResponse } from "@/types/api.types";

interface IProps {
    releasesList: CatalogResponse<CatalogAnime>
}

export default async function Releases({ releasesList }: IProps) {
    return (
        <div className="flex gap-2 items-start justify-between">
            <ul className="max-lg:w-1/2 w-7/10 flex flex-col justify-center gap-5 bg-stone-600/25 rounded-lg">
                {releasesList.data.map((anime) => (
                    <ReleaseCard release={anime} key={anime.id} />
                ))}
            </ul>
            <div className="max-lg:w-1/2 w-3/10 flex bg-stone-600/25 px-3 py-4 rounded-lg">
                123
            </div>
        </div>
    );
}
