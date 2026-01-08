"use client";
import { useEffect, useState } from "react";
import type {
    AnimeCatalogFilters,
    CatalogAnime,
    CatalogResponse,
    Genre,
} from "@/types/api.types";
import { fetchFilters, searchAnimeReleases } from "@/helpers/api";
import ReleaseList from "./ReleaseList";
import Filters from "./Filters/Filters";
import SearchBar from "@/components/SearchBar";

const initialData: AnimeCatalogFilters = {
    search: "",
    genres: [],
    types: [],
    publish_statuses: [],
    seasons: [],
    years: {},
} as const;

export default function Releases() {
    const [animePage, setAnimeCurrentPage] = useState<number>(1);
    const [animeList, setAnimeList] =
        useState<CatalogResponse<CatalogAnime> | null>(null);
    const [formData, setFormData] = useState<AnimeCatalogFilters>(initialData);
    const [filterData, setFilterData] = useState<{
        genres: Genre[];
        types: { value: string; description: string }[];
        publishStatuses: { value: string; description: string }[];
        seasons: { value: string; description: string }[];
        years: number[];
        ageRatings: { value: string; label: string; description: string }[];
    }>({
        genres: [],
        types: [],
        publishStatuses: [],
        seasons: [],
        years: [],
        ageRatings: [],
    });
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await searchAnimeReleases({
                    page: animePage,
                    limit: 21,
                    f: formData,
                });
                return data;
            } catch (error) {
                console.error(error);
                return null;
            }
        }
        const fetchTimedOut = setTimeout(() => {
            if (fetching) {
                fetchData()
                    .then((data) => {
                        if (!data) return;
                        setAnimeList((prev) => {
                            if (prev && animePage > 1) {
                                return {
                                    ...data,
                                    data: [...prev.data, ...data.data],
                                } as CatalogResponse<CatalogAnime>;
                            }
                            return data;
                        });

                        setFetching(false);
                        const currentPage =
                            data.meta?.pagination?.current_page ?? animePage;
                        const totalPages =
                            data.meta?.pagination?.total_pages ?? currentPage;
                        if (totalPages > currentPage) {
                            setAnimeCurrentPage((prev) => prev + 1);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        setFetching(false);
                    });
            }
        }, 500);

        return () => clearTimeout(fetchTimedOut);
    }, [fetching, animePage, formData]);
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
        fetchFilters().then((data) => {
            if (data) {
                setFilterData(data);
                setFormData((prev) => ({
                    ...prev,
                    years: {
                        from_year: data.years.at(0),
                        to_year: data.years.at(-1),
                    },
                }));
            }
        });
        return () => document.removeEventListener("scroll", scrollHandler);
    }, []);
    const resetAndFetch = () => {
        setAnimeList(null);
        setAnimeCurrentPage(1);
        setFetching(true);
    };

    return (
        <div className="flex gap-2 items-start justify-between">
            <div className="max-lg:w-1/2 w-7/10 flex flex-col gap-2">
                <SearchBar
                    id="releaseSearch"
                    onChange={(e) => {
                        setFormData((prev) => ({
                            ...prev,
                            search: e.target.value,
                        }));
                        resetAndFetch();
                    }}
                    placeholder="Введите название аниме..."
                    value={formData.search}
                />
                {animeList && <ReleaseList releases={animeList.data} />}
                {fetching && <p>Fetching...</p>}
            </div>
            <Filters
                filterData={filterData}
                formData={formData}
                setAnimeCurrentPage={setAnimeCurrentPage}
                setAnimeList={setAnimeList}
                setFetching={setFetching}
                setFormData={setFormData}
            />
        </div>
    );
}
