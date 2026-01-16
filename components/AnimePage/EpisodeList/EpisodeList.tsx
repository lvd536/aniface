import { Episode } from "@/types/api.types";
import EpisodeItem from "./EpisodeItem";
import { WatchedEpisodes } from "@/types/db.types";

interface IProps {
    episodes: Episode[];
    watchedEpisodes: WatchedEpisodes | undefined;
}

export default function EpisodeList({ episodes, watchedEpisodes }: IProps) {
    return (
        <div className="flex flex-wrap gap-2 p-2 bg-foreground/10 items-center justify-center rounded-lg">
            {episodes.map((episode) => {
                const watchedEpisode = watchedEpisodes?.find(
                    (e) => e.episode_id === episode.id
                );
                return (
                    <EpisodeItem
                        episode={episode}
                        watchedEpisodeData={watchedEpisode}
                        key={episode.id}
                    />
                );
            })}
        </div>
    );
}
