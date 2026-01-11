import { AnimeResponse } from "@/types/api.types";
import type { SupabaseClient } from "@supabase/supabase-js";

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
