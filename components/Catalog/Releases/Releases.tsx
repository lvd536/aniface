"use client";
import { useEffect } from "react";
import { fetchFilters, searchAnimeReleases } from "@/helpers/api";
import ReleaseList from "./ReleaseList";
import Filters from "./Filters/Filters";
import SearchBar from "@/components/SearchBar";
import { useFilterStore } from "@/types/filterStore";

export default function Releases() {
    const {
        setFilterData,
        setFormData,
        formData,
        setAnimeList,
        animeList,
        setFetching,
        fetching,
        animePage,
        setAnimePage,
    } = useFilterStore();

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
                        if (animeList && animePage > 1) {
                            setAnimeList({
                                ...data,
                                data: [...animeList.data, ...data.data],
                            });
                        } else {
                            setAnimeList(data);
                        }

                        setFetching(false);
                        const currentPage =
                            data.meta?.pagination?.current_page ?? animePage;
                        const totalPages =
                            data.meta?.pagination?.total_pages ?? currentPage;
                        if (totalPages > currentPage) {
                            setAnimePage(currentPage + 1);
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                        setFetching(false);
                    });
            }
        }, 500);

        return () => clearTimeout(fetchTimedOut);
    }, [
        fetching,
        animePage,
        formData,
        animeList,
        setAnimePage,
        setAnimeList,
        setFetching,
    ]);
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
                setFormData({
                    ...formData,
                    years: {
                        from_year: data.years.at(0),
                        to_year: data.years.at(-1),
                    },
                });
            }
        });
        return () => document.removeEventListener("scroll", scrollHandler);
    }, []);
    const resetAndFetch = () => {
        setAnimeList(null);
        setAnimePage(1);
        setFetching(true);
    };

    return (
        <div className="flex gap-2 items-start justify-between">
            <div className="max-lg:w-1/2 w-7/10 flex flex-col gap-2">
                <SearchBar
                    id="releaseSearch"
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            search: e.target.value,
                        });
                        resetAndFetch();
                    }}
                    placeholder="Введите название аниме..."
                    value={formData.search}
                />
                <ReleaseList />
                {fetching && <p>Fetching...</p>}
            </div>
            <Filters />
        </div>
    );
}
