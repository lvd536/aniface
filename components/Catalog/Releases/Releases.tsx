"use client";
import { useEffect, useState } from "react";
import ReleaseCard from "./ReleaseCard";
import { CatalogAnime, CatalogResponse } from "@/types/api.types";
import { getCatalog } from "@/helpers/api";

export default function Releases() {
    const [animePage, setCurrentPage] = useState<number>(1);
    const [animeList, setAnimeList] =
        useState<CatalogResponse<CatalogAnime> | null>(null);
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        if (fetching) {
            getCatalog(animePage).then((data) => {
                if (data) {
                    setAnimeList((prev) => ({
                        ...data,
                        data: [...(prev?.data || []), ...data.data],
                    }));
                    setCurrentPage((prev) => prev + 1);
                    setFetching(false);
                }
            });
        }
    }, [fetching, animePage]);

    useEffect(() => {
        function scrollHandler(e: Event) {
            const target = e.target as Document;
            const { documentElement } = target;
            if (
                documentElement.scrollHeight -
                    (documentElement.scrollTop + window.innerHeight) <
                100
            ) {
                setFetching(true);
            }
        }
        document.addEventListener("scroll", scrollHandler);

        return () => document.removeEventListener("scroll", scrollHandler);
    }, []);

    return (
        <div className="flex gap-2 items-start justify-between">
            {animeList ? (
                <>
                    <ul className="max-lg:w-1/2 w-7/10 flex flex-col justify-center gap-5 bg-stone-600/25 rounded-lg">
                        {animeList.data.map((anime) => (
                            <ReleaseCard release={anime} key={anime.id} />
                        ))}
                    </ul>
                    {fetching && <p>Fetching next results...</p>}
                </>
            ) : fetching ? (
                <div>Loading anime list!</div>
            ) : (
                <div>Error</div>
            )}
            <div className="max-lg:w-1/2 w-3/10 flex bg-stone-600/25 px-3 py-4 rounded-lg">
                TODO: Search bar & filtering
            </div>
        </div>
    );
}
