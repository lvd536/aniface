import SearchItem from "@/components/Modals/SearchItem";
import { getTitlesByStatus } from "@/helpers/supabase";
import { createClient } from "@/lib/supabase/server";

export default async function page() {
    const client = await createClient();
    const favoriteTitles = await getTitlesByStatus("isFavorite", client);
    return (
        <div className="flex flex-col gap-2">
            {favoriteTitles ? (
                favoriteTitles.map((title) => (
                    <SearchItem anime={title} className="h-25" key={title.id} />
                ))
            ) : (
                <>123</>
            )}
        </div>
    );
}
