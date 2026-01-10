import Link from "next/link";
import Image from "next/image";
import { getLatestReleases } from "@/helpers/api";
import { browserRoutes } from "@/consts/browserRoutes";
import { apiRoutes } from "@/consts/apiRoutes";

export default async function LatestReleases() {
    const latestAnime = await getLatestReleases(3);
    return (
        <div className="max-lg:hidden w-1/3 h-120 bg-foreground/10 rounded-md p-2">
            <h1 className="text-lg font-semibold text-center">
                Последние релизы
            </h1>
            <p className="text-xs text-foreground/40 text-center mb-2">
                Недавно вышедшие аниме
            </p>
            {latestAnime.map((anime) => (
                <Link
                    href={browserRoutes.anime.title(anime.id)}
                    className="flex min-h-20 gap-3 items-center justify-start px-3 py-4 hover:bg-foreground/25 rounded-lg transition-bg duration-300"
                    key={anime.id}
                >
                    <Image
                        src={apiRoutes.image(anime.poster.preview)}
                        width={1080}
                        height={1920}
                        alt="anime poster"
                        className="max-md:hidden min-w-17 max-w-17 h-full rounded-lg object-cover"
                    />
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="text-sm font-semibold">
                                {anime.name.main}
                            </p>
                            <p className="text-xs font-medium text-foreground/30">
                                {anime.name.english}
                            </p>
                        </div>
                        <div className="flex flex-col text-xs">
                            <ul className="flex flex-wrap gap-2 text-foreground/30">
                                {anime.genres.map((genre, index) => (
                                    <li
                                        key={genre.id}
                                        className="flex items-center gap-1"
                                    >
                                        {genre.name}
                                        {index !== anime.genres.length - 1 && (
                                            <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex gap-2 items-center text-foreground/40">
                                <p>{anime.year}</p>
                                <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                                <p>{anime.season.description}</p>
                                <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                                <p>{anime.type.description}</p>
                                <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                                <p>{anime.age_rating.label}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
