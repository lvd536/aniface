"use client";

import { markTitleAsUnWatched, markTitleAsWatched } from "@/helpers/supabase";
import { createClient } from "@/lib/supabase/client";
import { ToggleRight, ToggleLeft } from "lucide-react";

interface IProps {
    isTitleWatched: boolean;
    episodesTotal: number;
    animeId: number;
}

export default function ToggleTitleWatchedBtn({
    isTitleWatched,
    episodesTotal,
    animeId,
}: IProps) {
    const client = createClient();
    const toggleWatched = async () => {
        if (isTitleWatched)
            await markTitleAsUnWatched(animeId.toString(), client);
        else
            await markTitleAsWatched(
                "0",
                episodesTotal,
                animeId.toString(),
                client,
            );
    };
    return (
        <button
            className="flex text-sm hover:bg-foreground/20 w-fit transition-bg duration-300 rounded-lg"
            onClick={(e) => {
                e.preventDefault();
                toggleWatched().then(() => window.location.reload());
            }}
        >
            {isTitleWatched ? (
                <ToggleRight
                    className={`flex items-center justify-center bg-indigo-600/80 p-2 rounded-l-lg`}
                    width={36}
                    height={36}
                />
            ) : (
                <ToggleLeft
                    className={`flex items-center justify-center bg-foreground/10 p-2 rounded-l-lg`}
                    width={36}
                    height={36}
                />
            )}
            <p className="flex items-center justify-center bg-foreground/15 p-2 rounded-r-lg">
                Просмотренно
            </p>
        </button>
    );
}
