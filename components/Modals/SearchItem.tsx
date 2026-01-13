import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { CatalogAnime, LatestReleaseAnime } from "@/types/api.types";
import Link from "next/link";
import Image from "next/image";
import NoImage_9x16 from "@/public/NoImage_9x16.png";

interface IProps {
    anime: CatalogAnime | LatestReleaseAnime;
    onClick?: () => void;
}

async function getSafeImageUrl(url: string) {
    try {
        const res = await fetch(url, { method: "HEAD", cache: "no-store" });
        return res.ok ? url : NoImage_9x16;
    } catch {
        return NoImage_9x16;
    }
}

export default async function SearchItem({ anime, onClick }: IProps) {
    return (
        <Link
            href={browserRoutes.anime.title(anime.id)}
            className="flex rounded-l-lg w-full h-35 p-2 bg-black/40 rounded-r-lg"
            onClick={onClick}
        >
            <Image
                src={await getSafeImageUrl(
                    apiRoutes.image(anime.poster.preview)
                )}
                alt="anime poster"
                height={1080}
                width={1080}
                className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex flex-col justify-between w-full h-full px-4 py-2">
                <div>
                    <h3 className="text-xs lg:text-sm font-semibold bottom-6 z-1">
                        {anime.name.main}
                    </h3>
                    <p className="block text-xs text-foreground/60 font-medium">
                        {anime.name.english}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xs text-foreground/60 font-medium">
                        {anime.year}
                    </p>
                    <div className="block w-1 h-1 rounded-full bg-foreground/50" />
                    <p className="text-xs text-foreground/60 font-medium">
                        {anime.type.description}
                    </p>
                    {anime.episodes_total && (
                        <>
                            <div className="block w-1 h-1 rounded-full bg-foreground/50" />
                            <p className="text-xs text-foreground/60 font-medium">
                                {`Эпизодов: ${anime.episodes_total}`}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
}
