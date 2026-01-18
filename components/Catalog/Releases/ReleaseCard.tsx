import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { CatalogAnime, LatestReleaseAnime } from "@/types/api.types";
import Link from "next/link";
import imagePlaceholder from "@/public/9x16.png";
import ImageWithFallback from "@/components/ImageWithFallback";

interface IProps {
    release: CatalogAnime | LatestReleaseAnime;
}

export default function ReleaseCard({ release }: IProps) {
    return (
        <li>
            <Link
                href={browserRoutes.anime.title(release.id)}
                className="flex min-h-70 gap-3 items-center justify-start px-3 py-4 hover:bg-foreground/25 rounded-lg transition-bg duration-300"
            >
                <ImageWithFallback
                    src={apiRoutes.image(release.poster.preview)}
                    width={1080}
                    height={1920}
                    alt="anime poster"
                    className="max-md:hidden min-w-47 max-w-47 h-full rounded-lg object-cover"
                    fallbackSrc={imagePlaceholder}
                />
                <div className="flex flex-col gap-2">
                    <div>
                        <p className="text-md font-bold">{release.name.main}</p>
                        <p className="text-sm font-medium text-foreground/30">
                            {release.name.english}
                        </p>
                    </div>
                    <div className="flex flex-col text-sm">
                        <ul className="flex flex-wrap gap-2 text-foreground/30">
                            {release.genres.map((genre, index) => (
                                <li
                                    key={genre.id}
                                    className="flex items-center gap-1"
                                >
                                    {genre.name}
                                    {index !== release.genres.length - 1 && (
                                        <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-2 items-center text-foreground/40">
                            <p>{release.year}</p>
                            <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                            <p>{release.season.description}</p>
                            <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                            <p>{release.type.description}</p>
                            <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                            <p>{release.age_rating.label}</p>
                        </div>
                    </div>
                    <p className="text-foreground/75 line-clamp-12 lg:line-clamp-6 mt-2">
                        {release.description}
                    </p>
                </div>
            </Link>
        </li>
    );
}
