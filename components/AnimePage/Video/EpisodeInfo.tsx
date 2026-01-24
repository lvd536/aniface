import { browserRoutes } from "@/consts/browserRoutes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface IProps {
    nameRu: string;
    nameEn: string;
    releaseId: number;
    ordinal: number;
    nextEpisodeId?: string;
}

export default function EpisodeInfo({
    nameEn,
    nameRu,
    releaseId,
    ordinal,
    nextEpisodeId,
}: IProps) {
    return (
        <div className="absolute left-1 top-1 flex items-center justify-start p-2 rounded-lg gap-3 bg-black/50">
            <Link
                href={browserRoutes.anime.title(releaseId)}
                className="p-2 rounded-lg bg-foreground/15"
            >
                <ArrowLeft width={20} height={20} />
            </Link>
            <div>
                <p className="font-bold text-xs md:text-sm text-clip line-clamp-1">
                    {nameRu}
                </p>
                <p className="text-xs text-foreground/50 text-clip line-clamp-1">
                    {nameEn}
                </p>
            </div>
            <span className="w-0.5 h-5 bg-white/50 rounded-full mx-1" />
            <p className="font-bold text-xs md:text-md">{`${ordinal} Эпизод`}</p>

            {nextEpisodeId && (
                <>
                    <span className="w-0.5 h-5 bg-white/50 rounded-full mx-1" />
                    <Link
                        href={browserRoutes.anime.episode(nextEpisodeId)}
                        className="font-medium text-xs md:text-md p-2 rounded-lg bg-foreground/15"
                    >
                        Следующий эпизод
                    </Link>
                </>
            )}
        </div>
    );
}
