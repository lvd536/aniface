import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { CatalogAnime, LatestReleaseAnime } from "@/types/api.types";
import Link from "next/link";
import Image from "next/image";

interface IProps {
    anime: CatalogAnime | LatestReleaseAnime;
}
export default function SearchItem({ anime }: IProps) {
    return (
        <Link
            href={browserRoutes.anime.title(anime.id)}
            className="flex rounded-l-lg w-full h-50 p-2"
        >
            <Image
                src={apiRoutes.image(anime.poster.preview)}
                alt="franchise"
                height={1920}
                width={1080}
                className="w-1/2 h-full rounded-l-lg object-cover"
            />
            <div className="flex flex-col justify-between bg-black/40 w-1/2 h-full rounded-r-lg px-4 py-2">
                <div>
                    <h3 className="text-xs lg:text-sm font-semibold bottom-6 z-1">
                        {anime.name.main}
                    </h3>
                    <p className="hidden lg:block text-xs text-foreground/60 font-medium">
                        {anime.name.english}
                    </p>
                </div>
                <div>
                    <div className="flex gap-2">
                        <p className="text-xs text-foreground/60 font-medium">
                            {anime.year}
                        </p>
                    </div>
                    {anime.episodes_total && (
                        <p className="text-xs text-foreground/60 font-medium">
                            {`Эпизодов: ${anime.episodes_total}`}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}
