import { apiRoutes } from "@/consts/apiRoutes";
import { LatestReleaseAnime } from "@/types/api.types";
import Image from "next/image";
import HoverItem from "./HoverItem";

interface IProps {
    anime: LatestReleaseAnime;
}

export default function AnimeCard({ anime }: IProps) {
    return (
        <div key={anime.id} className="group relative">
            <Image
                src={apiRoutes.image(anime.poster.preview)}
                alt=""
                height={300}
                width={150}
                className="w-full h-full"
            />
            <div className="absolute left-0 top-0 flex flex-col justify-between items-center opacity-0 hover:opacity-100 bg-black/60 w-full h-full transition-opacity duration-500 py-2">
                <p>{anime.latest_episode.ordinal} Эпизод</p>
                <h1 className="font-semibold text-xl text-center">
                    {anime.name.main}
                </h1>
                <div className="flex px-3 py-1 items-center justify-between">
                    <HoverItem separatingCircle>
                        {anime.season.description}
                    </HoverItem>
                    <HoverItem separatingCircle>{anime.year}</HoverItem>
                    <HoverItem separatingCircle className="px-2">
                        {anime.type.description}
                    </HoverItem>
                    <HoverItem>{anime.age_rating.label}</HoverItem>
                </div>
            </div>
        </div>
    );
}
