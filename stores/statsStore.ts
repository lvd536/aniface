import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import {
    getLastWatchedTitles,
    getTotalWatchedTimeSeconds,
} from "@/helpers/supabase";
import { EpisodeResponse } from "@/types/api.types";

type GenreStat = { genre: string; cnt: number };

type StatsState = {
    totalTitles: number;
    totalEpisodes: number;
    totalSeconds: number;
    topGenres: GenreStat[];
    totalLastWatched: {
        episode: EpisodeResponse;
        stopTime: any;
    }[];
    fetchStats: (userId: string) => Promise<void>;
};

export const useStatsStore = create<StatsState>((set) => ({
    totalTitles: 0,
    totalEpisodes: 0,
    totalSeconds: 0,
    topGenres: [],
    totalLastWatched: [],

    fetchStats: async (userId) => {
        const supabase = createClient();
        const [
            { data: episodes },
            watchedSeconds,
            { data: genres },
            { data: titles },
            lastWatched,
        ] = await Promise.all([
            supabase.rpc("get_total_watched_episodes", {
                p_user_id: userId,
            }),
            await getTotalWatchedTimeSeconds(userId, supabase),
            supabase.rpc("get_top3_genres_and_others", {
                p_user_id: userId,
            }),
            await supabase
                .from("user_titles")
                .select("anime_id, end_watching")
                .not("end_watching", "is", null)
                .eq("user_id", userId),
            await getLastWatchedTitles(userId, supabase, 5),
        ]);
        set({
            totalEpisodes: Number(episodes ?? 0),
            totalSeconds: Number(watchedSeconds),
            topGenres: (genres as any[]) ?? [],
            totalTitles: titles?.length ?? 0,
            totalLastWatched: lastWatched ?? [],
        });
    },
}));
