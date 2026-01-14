import LastWatchCard from "@/components/Profile/LastWatchCard";
import { getLastWatchedTitles } from "@/helpers/supabase";
import { createClient } from "@/lib/supabase/server";

export default async function page() {
    const client = await createClient();
    const { data: auth } = await client.auth.getUser();
    const lastWatched = auth.user
        ? await getLastWatchedTitles(auth.user.id, client)
        : undefined;
    return (
        <div className="flex flex-col gap-2 p-2">
            {lastWatched ? (
                lastWatched.map((episode) => (
                    <LastWatchCard episode={episode} key={episode.episode.id} />
                ))
            ) : (
                <>123</>
            )}
        </div>
    );
}
