import SearchItem from "@/components/Modals/SearchItem";
import EmptyPage from "@/components/Notebook/EmptyPage";
import { getTitlesByStatus } from "@/helpers/supabase";
import { createClient } from "@/lib/supabase/server";

export default async function page() {
    const client = await createClient();
    const plannedTitles = await getTitlesByStatus("isPlanned", client);
    return (
        <>
            {plannedTitles && plannedTitles.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {plannedTitles.map((title) => (
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
