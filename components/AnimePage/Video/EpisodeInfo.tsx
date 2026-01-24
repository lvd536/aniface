import { browserRoutes } from "@/consts/browserRoutes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface IProps {
    nameRu: string;
    nameEn: string;
    releaseId: number;
    ordinal: number;
}

export default function EpisodeInfo({
    nameEn,
    nameRu,
    releaseId,
    ordinal,
}: IProps) {
    return (
        <div className="fixed left-30 top-2 flex items-center justify-start p-2 rounded-lg gap-3 bg-black/50 z-50">
            <Link
                href={browserRoutes.anime.title(releaseId)}
                className="p-2 rounded-lg bg-foreground/15"
            >
                <ArrowLeft width={20} height={20} />
            </Link>
            <div>
                <p className="font-bold text-sm">{nameRu}</p>
                <p className="text-xs text-foreground/50">{nameEn}</p>
            </div>
            <span className="w-0.5 h-5 bg-foreground/90 rounded-full mx-1" />
            <p className="font-bold text-md">{`${ordinal} Эпизод`}</p>
        </div>
    );
}
