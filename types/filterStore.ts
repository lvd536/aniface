import { create } from "zustand";
import {
    CatalogResponse,
    CatalogAnime,
    AnimeCatalogFilters,
    FilterData,
} from "./api.types";

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
}
export const useFilterStore = create<FilterStore>((set) => ({
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
    setFormData: (data) => set({ formData: data }),
    fetching: true,
    setFetching: (fetching) => set({ fetching }),
    filterData: {
        genres: [],
        types: [],
        publishStatuses: [],
        seasons: [],
        years: [],
        ageRatings: [],
    },
    setFilterData: (data) => set({ filterData: data }),
}));
