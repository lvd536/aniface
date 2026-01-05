import { Episode } from "@/types/api.types";
import EpisodeItem from "./EpisodeItem";

interface IProps {
    episodes: Episode[];
}

export default function EpisodeList({ episodes }: IProps) {
    return (
        <div className="flex flex-wrap gap-2 p-2 bg-foreground/10 items-center justify-center rounded-lg">
            {episodes.map((episode) => (
                <EpisodeItem
                    id={episode.id}
                    name={episode.name}
                    ordinal={episode.ordinal}
                    duration={episode.duration}
                    image={episode.preview.preview}
                    key={episode.id}
                />
            ))}
        </div>
    );
}
