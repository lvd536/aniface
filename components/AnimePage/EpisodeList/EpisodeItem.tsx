import { browserRoutes } from "@/consts/browserRoutes";
import Link from "next/link";
import Image from "next/image";
import { apiRoutes } from "@/consts/apiRoutes";

interface IProps {
    image: string;
    id: string;
    duration: number;
    name: string;
    ordinal: number;
}

export default function EpisodeItem({
    id,
    name,
    ordinal,
    image,
    duration,
}: IProps) {
    function getMsFromSeconds(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds}`;
    }
    return (
        <Link
            href={browserRoutes.anime.episode(id)}
            key={id}
            className="relative w-80 h-40 rounded-lg"
        >
            <Image
                src={apiRoutes.image(image)}
                alt="Episode poster"
                width={1920}
                height={1080}
                className="w-80 h-40 rounded-lg object-cover"
            />
            <div className="absolute flex top-0 left-0 w-full h-full items-end justify-between backdrop-blur-xs bg-black/65 rounded-lg p-3">
                <div>
                    <p className="text-xs text-foreground/50">{name}</p>
                    <p className="text-sm font-bold">{`${ordinal} Эпизод`}</p>
                </div>
                <p className="text-xs p-2 bg-black/40 rounded-lg">
                    {getMsFromSeconds(duration)}
                </p>
            </div>
        </Link>
    );
}
