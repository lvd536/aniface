import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { Genre } from "@/types/api.types";
import Image from "next/image";
import Link from "next/link";

interface IProps {
    genre: Genre;
}

export default function GenreCard({ genre }: IProps) {
    return (
        <>
            <Link
                href={browserRoutes.anime.genre(genre.id)}
                className="relative rounded-lg w-50 h-72"
            >
                <Image
                    src={apiRoutes.image(genre.image.preview)}
                    alt="genre"
                    height={1080}
                    width={1920}
                    className="w-50 h-72 rounded-lg"
                />
                <h3 className="absolute w-50 text-sm font-bold text-center bottom-6 z-1">
                    {genre.name}
                </h3>
                <p className="absolute w-50 text-xs text-foreground/60 font-bold text-center bottom-1 z-1">
                    {`Релизов: ${genre.total_releases}`}
                </p>
                <div className="absolute left-0 top-0 w-50 h-72 card-shadow rounded-lg" />
            </Link>
        </>
    );
}
