import { create } from "zustand";
import {
    CatalogResponse,
    CatalogAnime,
    AnimeCatalogFilters,
    FilterData,
} from "./api.types";
import { searchAnimeReleases, fetchFilters } from "@/helpers/api";

interface FilterStore {
    animePage: number;
    setAnimePage: (page: number) => void;
    animeList: CatalogResponse<CatalogAnime> | null;
    setAnimeList: (list: CatalogResponse<CatalogAnime> | null) => void;
    formData: AnimeCatalogFilters;
    setFormData: (data: AnimeCatalogFilters) => void;
    filterData: FilterData;
    setFilterData: (data: FilterData) => void;
    fetching: boolean;
    setFetching: (fetching: boolean) => void;
    showFilters: boolean;
    setShowFilters: (show: boolean) => void;

    fetchPage: () => Promise<void>;
    fetchFiltersOnce: () => Promise<void>;
    init: () => () => void;
    resetAndFetch: () => Promise<void>;
}

export const useFilterStore = create<FilterStore>((set, get) => {
    let fetchTimeout: ReturnType<typeof setTimeout> | null = null;

    function mergeLists(
        prev: CatalogResponse<CatalogAnime> | null,
        next: CatalogResponse<CatalogAnime>
    ): CatalogResponse<CatalogAnime> {
        if (!prev) return next;
        return {
            ...next,
            data: [...(prev.data ?? []), ...(next.data ?? [])],
        };
    }

    async function _fetchPageImpl() {
        const state = get();
        const page = state.animePage;
        console.log(`[store] _fetchPageImpl start page=${page}`);
        try {
            const data = await searchAnimeReleases({
                page,
                limit: 21,
                f: state.formData,
            });
            if (!data) {
                set({ fetching: false });
                return;
            }

            set((s) => {
                const newList =
                    s.animeList && page > 1
                        ? mergeLists(s.animeList, data)
                        : data;
                return {
                    animeList: newList,
                    fetching: false,
                };
            });

            const currentPage = data.meta?.pagination?.current_page ?? page;
            const totalPages =
                data.meta?.pagination?.total_pages ?? currentPage;
            if (totalPages > currentPage) {
                set({ animePage: currentPage + 1 });
            }
        } catch (err) {
            console.error("fetchPage error:", err);
            set({ fetching: false });
        }
    }

    return {
        animePage: 1,
        setAnimePage: (page) => set({ animePage: page }),
        animeList: null,
        setAnimeList: (list) => set({ animeList: list }),
        formData: {
            search: "",
            genres: [],
            types: [],
            publishStatuses: [],
            seasons: [],
            years: {},
            ageRatings: [],
        },
        setFormData: (data) => {
            set({ formData: data, animePage: 1, animeList: null });
        },
        showFilters: true,
        setShowFilters: (show) => set({ showFilters: show }),
        fetching: false,
        setFetching: (fetching) => {
            set({ fetching });
            if (fetching) {
                if (fetchTimeout) clearTimeout(fetchTimeout);
                fetchTimeout = setTimeout(() => {
                    if (get().fetching) {
                        _fetchPageImpl();
                    }
                }, 500);
            } else {
                if (fetchTimeout) {
                    clearTimeout(fetchTimeout);
                    fetchTimeout = null;
                }
            }
        },

        filterData: {
            genres: [],
            types: [],
            publishStatuses: [],
            seasons: [],
            years: [],
            ageRatings: [],
        },
        setFilterData: (data) => set({ filterData: data }),

        fetchPage: async () => {
            if (fetchTimeout) {
                clearTimeout(fetchTimeout);
                fetchTimeout = null;
            }
            set({ fetching: true });
            await _fetchPageImpl();
        },

        fetchFiltersOnce: async () => {
            try {
                const data = await fetchFilters();
                if (!data) return;
                set({ filterData: data });

                set((s) => ({
                    formData: {
                        ...s.formData,
                        years: {
                            from_year: data.years.at(0),
                            to_year: data.years.at(-1),
                        },
                    },
                }));
            } catch (err) {
                console.error("fetchFilters error:", err);
            }
        },

        resetAndFetch: async () => {
            set({ animePage: 1, animeList: null, fetching: true });
            await _fetchPageImpl();
        },

        init: () => {
            function scrollHandler() {
                const doc =
                    document.scrollingElement || document.documentElement;
                if (!doc) return;
                if (
                    doc.scrollHeight - (doc.scrollTop + window.innerHeight) <
                    100
                ) {
                    get().setFetching(true);
                }
            }
            window.addEventListener("scroll", scrollHandler);
            get()
                .fetchFiltersOnce()
                .then(() => {
                    get().setFetching(true);
                })
                .catch((err) => {
                    console.error("init: fetchFiltersOnce failed", err);
                    get().setFetching(true);
                });

            return () => {
                window.removeEventListener("scroll", scrollHandler);
                if (fetchTimeout) {
                    clearTimeout(fetchTimeout);
                    fetchTimeout = null;
                }
            };
        },
    };
});
