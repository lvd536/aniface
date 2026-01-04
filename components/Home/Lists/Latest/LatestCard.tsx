import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { LatestReleaseAnime } from "@/types/api.types";
import Link from "next/link";
import Image from "next/image";
import HoverItem from "@/components/AnimeCard/HoverItem";

interface IProps {
    anime: LatestReleaseAnime;
}

export default function LatestCard({ anime }: IProps) {
    return (
        <li key={anime.id}>
            <Link
                href={browserRoutes.anime.title(anime.id.toString())}
                className="relative rounded-lg w-25 sm:w-30 lg:w-60 xl:w-50 2xl:w-60 max-h-85 min-h-35"
            >
                <Image
                    src={apiRoutes.image(anime.poster.preview)}
                    alt="anime"
                    height={300}
                    width={150}
                    className="w-full h-full rounded-lg"
                />
                <div className="absolute left-0 top-0 flex flex-col justify-between items-center opacity-0 hover:opacity-100 bg-black/60 w-full h-full transition-opacity duration-500 py-2">
                    {"latest_episode" in anime && anime.latest_episode && (
                        <p className="p-2 font-semibold rounded-sm bg-gray-600/85">
                            {`${anime.latest_episode.ordinal} Эпизод`}
                        </p>
                    )}
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
            </Link>
        </li>
    );
}
