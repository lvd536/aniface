export interface WatchedEpisode {
    isWatched: boolean;
    episode_id: string;
    watched_time: number;
    episode_number: number;
}

export type WatchedEpisodes = WatchedEpisode[];
