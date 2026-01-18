import { apiRoutes } from "@/consts/apiRoutes";
import type { LatestReleaseAnime, CatalogAnime } from "@/types/api.types";
import HoverItem from "./HoverItem";
import Link from "next/link";
import { browserRoutes } from "@/consts/browserRoutes";
import ImageWithFallback from "../ImageWithFallback";
import imagePlaceholder from "@/public/9x16.png";

interface IProps {
    anime: CatalogAnime | LatestReleaseAnime;
}

export default function AnimeCard({ anime }: IProps) {
    return (
        <Link
            key={anime.id}
            href={browserRoutes.anime.title(anime.id)}
            className="relative"
        >
            <ImageWithFallback
                src={apiRoutes.image(anime.poster.preview)}
                alt="anime"
                height={1920}
                width={1080}
                className="min-w-47 max-w-47 h-72 rounded-lg object-cover"
                fallbackSrc={imagePlaceholder}
            />
            <div className="absolute left-0 top-0 flex flex-col justify-between items-center opacity-0 hover:opacity-100 bg-black/60 min-w-47 max-w-47 h-72 transition-opacity duration-500 py-2 rounded-lg">
                {"latest_episode" in anime && anime.latest_episode && (
                    <p>{anime.latest_episode.ordinal} Эпизод</p>
                )}
                <h1 className="font-semibold text-xl text-center wrap-anywhere">
                    {anime.name.main}
                </h1>
                <div className="flex text-xs xl:text-sm flex-wrap px-3 py-1 items-center justify-between">
                    <HoverItem separatingCircle>
                        {anime.season.description}
                    </HoverItem>
                    <HoverItem separatingCircle>{anime.year}</HoverItem>
                    <HoverItem separatingCircle className="px-1">
                        {anime.type.description}
                    </HoverItem>
                    <HoverItem>{anime.age_rating.label}</HoverItem>
                </div>
            </div>
        </Link>
    );
}
