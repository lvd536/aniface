import { AnimeResponse } from "@/types/api.types";
import { WatchedEpisode, WatchedEpisodes } from "@/types/db.types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getEpisode } from "./api";

export async function checkAnimeExists(
    anime: AnimeResponse,
    client: SupabaseClient,
    insert = false
): Promise<boolean> {
    const animeId = String(anime.id);

    const { data, error } = await client
        .from("anime")
        .select("id")
        .eq("id", animeId)
        .maybeSingle();

    if (error) {
        console.error("checkAnimeExists: select error", error);
        return false;
    }

    if (data) return true;

    if (!data && insert) {
        const payload = {
            id: animeId,
            name: anime.name?.main ?? "",
            created_at: anime.created_at ?? new Date().toISOString(),
            genres: (anime.genres ?? []).map((g) => g.name),
        };

        const { error: insertError } = await client
            .from("anime")
            .upsert(payload, { onConflict: "id" });

        if (insertError) {
            console.error("checkAnimeExists: upsert error", insertError);
            return false;
        }

        return true;
    }

    return false;
}

export async function checkUserTitleExists(
    anime: AnimeResponse,
    client: SupabaseClient,
    insert = false
) {
    const {
        data: { user },
        error: userError,
    } = await client.auth.getUser();

    if (userError) {
        console.error("checkUserTitleExists: getUser error", userError);
        return;
    }

    if (!user) throw new Error("User is not authenticated");

    const userId = user.id;
    const animeId = String(anime.id);

    const animeOk = await checkAnimeExists(anime, client, true);
    if (!animeOk) throw new Error("Failed to ensure anime exists");

    const { data: existing, error: selectError } = await client
        .from("user_titles")
        .select("*")
        .eq("user_id", userId)
        .eq("anime_id", animeId)
        .maybeSingle();

    if (selectError) {
        console.error("checkUserTitleExists: select error", selectError);
        throw selectError;
    }

    if (existing) return existing;

    if (!existing && insert) {
        const rawAvg = anime.average_duration_of_episode ?? 1500;
        const avg_episode_seconds =
            typeof rawAvg === "number" && rawAvg > 0
                ? rawAvg < 1000
                    ? Math.round(rawAvg * 60)
                    : Math.round(rawAvg)
                : 0;

        const payload = {
            user_id: userId,
            anime_id: animeId,
            start_watching: new Date().toISOString(),
            end_watching: null,
            genres: (anime.genres ?? []).map((g) => g.name),
            last_watched_episode: 0,
            end_time: new Date().toISOString(),
            episodes_count: 0,
            avg_episode_seconds,
        };

        const { data: inserted, error: insertError } = await client
            .from("user_titles")
            .insert(payload)
            .select()
            .maybeSingle();

        if (insertError) {
            console.error("checkUserTitleExists: insert error", insertError);
            throw insertError;
        }

        return inserted ?? null;
    }
    return null;
}

export async function markEpisodeAsWatched(
    episodeId: string,
    episodeNumber: number,
    animeId: string,
    watchedTime: number,
    client: SupabaseClient
) {
    const {
        data: { user },
        error: userError,
    } = await client.auth.getUser();

    if (userError || !user) {
        console.error("markEpisodeAsWatched: getUser error", userError);
        return;
    }

    try {
        const { data: titleExistsData, error: titleExistsError } = await client
            .from("user_titles")
            .select(
                "id, watched_episodes, episodes_count, end_time, last_watched_episode"
            )
            .eq("user_id", user.id)
            .eq("anime_id", animeId)
            .maybeSingle();

        if (titleExistsError) throw titleExistsError;
        if (!titleExistsData) return;

        let episodes = Array.isArray(titleExistsData.watched_episodes)
            ? [...titleExistsData.watched_episodes]
            : [];

        const episodeIndex = episodes.findIndex(
            (ep: any) => ep.episode_id === episodeId
        );

        const newEpisodeData = {
            episode_id: episodeId,
            episode_number: episodeNumber,
            watched_time: watchedTime,
            isWatched: true,
        };

        if (episodeIndex !== -1) {
            episodes[episodeIndex] = {
                ...episodes[episodeIndex],
                ...newEpisodeData,
            };
        } else {
            episodes.push(newEpisodeData);
        }

        const { error: updateError } = await client
            .from("user_titles")
            .update({
                watched_episodes: episodes,
                episodes_count: titleExistsData.episodes_count + 1,
                end_time: new Date().toISOString(),
                last_watched_episode: episodeId,
            })
            .eq("id", titleExistsData.id);

        if (updateError) throw updateError;
    } catch (error) {
        console.error("Error in markEpisodeAsWatched:", error);
    }
}

export async function saveEpisodeWatchedTime(
    episodeId: string,
    episodeNumber: number,
    animeId: string,
    watchedTime: number,
    client: SupabaseClient
) {
    const {
        data: { user },
        error: userError,
    } = await client.auth.getUser();

    if (userError || !user) {
        console.error("saveEpisodeWatchedTime: getUser error", userError);
        return;
    }

    try {
        const { data: titleExistsData, error: titleExistsError } = await client
            .from("user_titles")
            .select("id, watched_episodes, last_watched_episode")
            .eq("user_id", user.id)
            .eq("anime_id", animeId)
            .maybeSingle();

        if (titleExistsError) throw titleExistsError;
        if (!titleExistsData) return;

        let episodes = Array.isArray(titleExistsData.watched_episodes)
            ? [...titleExistsData.watched_episodes]
            : [];

        const episodeIndex = episodes.findIndex(
            (ep: any) => ep.episode_id === episodeId
        );

        if (episodeIndex !== -1 && episodes[episodeIndex].isWatched) {
            return;
        }

        const newEpisodeData = {
            episode_id: episodeId,
            episode_number: episodeNumber,
            watched_time: watchedTime,
            isWatched: false,
        };

        if (episodeIndex !== -1) {
            episodes[episodeIndex] = {
                ...episodes[episodeIndex],
                ...newEpisodeData,
            };
        } else {
            episodes.push(newEpisodeData);
        }

        const { error: updateError } = await client
            .from("user_titles")
            .update({
                watched_episodes: episodes,
                last_watched_episode: episodeId,
            })
            .eq("id", titleExistsData.id);

        if (updateError) throw updateError;
    } catch (error) {
        console.error("Error in saveEpisodeWatchedTime:", error);
    }
}

export async function markTitleAsWatched(
    episodeId: string,
    episodeNumber: number,
    animeId: string,
    client: SupabaseClient
) {
    const {
        data: { user },
        error: userError,
    } = await client.auth.getUser();

    if (userError || !user) {
        console.error("saveEpisodeWatchedTime: getUser error", userError);
        return;
    }

    try {
        const { data: titleExistsData, error: titleExistsError } = await client
            .from("user_titles")
            .select("id, end_watching, episodes_count, last_watched_episode")
            .eq("user_id", user.id)
            .eq("anime_id", animeId)
            .maybeSingle();

        if (titleExistsError) throw titleExistsError;
        if (!titleExistsData) return;

        const { error: updateError } = await client
            .from("user_titles")
            .update({
                end_watching: new Date().toISOString(),
                episodes_count: episodeNumber,
                last_watched_episode: episodeId,
            })
            .eq("id", titleExistsData.id);

        if (updateError) throw updateError;
    } catch (error) {
        console.error("Error in saveEpisodeWatchedTime:", error);
    }
}

export async function getWatchedEpisodes(
    animeId: string,
    client: SupabaseClient
) {
    const {
        data: { user },
        error: userError,
    } = await client.auth.getUser();

    if (userError || !user) {
        console.error("saveEpisodeWatchedTime: getUser error", userError);
        return;
    }

    try {
        const { data: titleExistsData, error: titleExistsError } = await client
            .from("user_titles")
            .select("id, end_watching, episodes_count, last_watched_episode")
            .eq("user_id", user.id)
            .eq("anime_id", animeId)
            .maybeSingle();

        if (titleExistsError) throw titleExistsError;
        if (!titleExistsData) return;

        const { data: episodesData, error: episodesError } = await client
            .from("user_titles")
            .select("watched_episodes")
            .eq("id", titleExistsData.id)
            .maybeSingle();
        if (episodesData) {
            const { watched_episodes } = episodesData;
            return watched_episodes;
        }
        if (episodesError) throw episodesError;
    } catch (error) {
        console.error("Error in saveEpisodeWatchedTime:", error);
    }
}

export async function getTotalWatchedTimeSeconds(
    userId: string,
    client: SupabaseClient
) {
    try {
        const { data, error } = await client
            .from("user_titles")
            .select("episodes_count, avg_episode_seconds")
            .eq("user_id", userId);
        if (error) throw error;
        let watchedTime = 0;
        data.map((title) => {
            watchedTime += title.episodes_count * title.avg_episode_seconds;
        });
        return watchedTime;
    } catch (error) {
        console.error("Error in getTotalWatchedTimeSeconds:", error);
        return 0;
    }
}

export async function getLastWatchedTitles(
    userId: string,
    client: SupabaseClient
) {
    try {
        const { data, error } = await client
            .from("user_titles")
            .select("anime_id, last_watched_episode, watched_episodes")
            .eq("user_id", userId)
            .limit(3);
        if (error) throw error;
        const mappedLastWatched = data.map(async (title) => ({
            episode: await getEpisode(title.last_watched_episode),
            stopTime:
                title.watched_episodes.find(
                    (e: WatchedEpisode) =>
                        e.episode_id === title.last_watched_episode
                ) || 0,
        }));
        return await Promise.all(mappedLastWatched);
    } catch (error) {
        console.error("Error in getTotalWatchedTimeSeconds:", error);
        return undefined;
    }
}
