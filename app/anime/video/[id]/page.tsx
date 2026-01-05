import { browserRoutes } from "@/consts/browserRoutes";
import { getEpisode } from "@/helpers/api";
import Link from "next/link";
import ReactPlayer from "react-player";
import { ArrowLeft } from "lucide-react";
interface IProps {
    params: Promise<{ id: string }>;
}

export default async function page({ params }: IProps) {
    const { id } = await params;
    const episode = await getEpisode(id);
    return (
        <div className="fixed left-0 top-0 w-screen h-screen flex flex-col gap-5 bg-background items-center justify-center z-5">
            <div className="fixed left-30 top-2 flex items-center justify-start p-2 rounded-lg gap-3 bg-black/50">
                <Link
                    href={browserRoutes.anime.title(episode.release.id)}
                    className="p-2 rounded-lg bg-foreground/15"
                >
                    <ArrowLeft width={20} height={20} />
                </Link>
                <div>
                    <p className="font-bold text-sm">
                        {episode.release.name.main}
                    </p>
                    <p className="text-xs text-foreground/50">
                        {episode.release.name.english}
                    </p>
                </div>
                <span className="w-1.5 h-1.5 bg-foreground/80 rounded-full" />
                <p className="font-bold text-md">{`${episode.ordinal} Эпизод`}</p>
            </div>
            <ReactPlayer
                src={episode.hls_480}
                controls
                width="100%"
                height="100%"
            />
        </div>
    );
}
