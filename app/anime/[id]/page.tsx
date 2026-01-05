import AnimeInfo from "@/components/AnimePage/AnimeInfo";
import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { getAnime } from "@/helpers/api";
import Image from "next/image";
import Link from "next/link";
interface IProps {
    params: Promise<{ id: string }>;
}

export default async function page({ params }: IProps) {
    const { id } = await params;
    const anime = await getAnime(id);
    function getMsFromSeconds(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds}`;
    }
    return (
        <div className="w-full h-full flex flex-col gap-2">
            <AnimeInfo anime={anime} />
            <div className="flex flex-wrap gap-2 p-2 bg-foreground/10 items-center justify-center rounded-lg">
                {anime.episodes.map((episode) => (
                    <Link
                        href={browserRoutes.anime.episode(episode.id)}
                        key={episode.id}
                        className="relative w-80 h-40 rounded-lg"
                    >
                        <Image
                            src={apiRoutes.image(episode.preview.preview)}
                            alt="Episode poster"
                            width={1920}
                            height={1080}
                            className="w-80 h-40 rounded-lg"
                        />
                        <div className="absolute flex top-0 left-0 w-full h-full items-end justify-between backdrop-blur-xs bg-black/65 rounded-lg p-3">
                            <div>
                                <p className="text-xs text-foreground/50">
                                    {episode.name}
                                </p>
                                <p className="text-sm font-bold">{`${episode.ordinal} Эпизод`}</p>
                            </div>
                            <p className="text-xs p-2 bg-black/40 rounded-lg">
                                {getMsFromSeconds(episode.duration)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
