import SearchItem from "@/components/Modals/SearchItem";
import EmptyPage from "@/components/Notebook/EmptyPage";
import { getTitlesByStatus } from "@/helpers/supabase";
import { createClient } from "@/lib/supabase/server";

export default async function page() {
    const client = await createClient();
    const favoriteTitles = await getTitlesByStatus("isFavorite", client);
    return (
        <>
            {favoriteTitles ? (
                <div className="flex flex-col gap-2">
                    {favoriteTitles.map((title) => (
                        <SearchItem
                            anime={title}
                            className="h-25"
                            key={title.id}
                        />
                    ))}
                </div>
            ) : (
                <EmptyPage />
            )}
        </>
    );
}
