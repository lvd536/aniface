import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { Genre } from "@/types/api.types";
import Image from "next/image";
import Link from "next/link";
import NoImage_9x16 from "@/public/NoImage_9x16.png";

interface IProps {
    genre: Genre;
}

async function getSafeImageUrl(url: string) {
    try {
        const res = await fetch(url, { method: "HEAD", cache: "no-store" });
        return res.ok ? url : NoImage_9x16;
    } catch {
        return NoImage_9x16;
    }
}

export default async function GenreCard({ genre }: IProps) {
    return (
        <>
            <Link
                href={browserRoutes.anime.genre(genre.id)}
                className="relative rounded-lg min-w-47 max-w-47 h-72"
            >
                <Image
                    src={await getSafeImageUrl(
                        apiRoutes.image(genre.image.preview)
                    )}
                    alt="genre"
                    height={1920}
                    width={1080}
                    className="min-w-47 max-w-47 h-72 rounded-lg object-cover"
                />
                <h3 className="absolute min-w-47 max-w-47 text-sm font-semibold text-center bottom-6 z-1">
                    {genre.name}
                </h3>
                <p className="absolute min-w-47 max-w-47 text-xs text-foreground/60 font-medium text-center bottom-1 z-1">
                    {`Релизов: ${genre.total_releases}`}
                </p>
                <div className="absolute left-0 top-0 min-w-47 max-w-47 h-72 card-shadow rounded-lg" />
            </Link>
        </>
    );
}
