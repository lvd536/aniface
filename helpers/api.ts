import { apiRoutes } from "@/consts/apiRoutes";
import {
    CatalogResponse,
    GenresResponse,
    LatestReleasesResponse,
    SearchAnimeResponse,
} from "@/types/api.types";
import axios from "axios";

export async function getCatalog(
    page: number,
    limit?: number
): Promise<CatalogResponse> {
    try {
        const response: CatalogResponse = await axios
            .get(apiRoutes.catalog, {
                params: {
                    limit: limit || 20,
                    page: page,
                },
            })
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.error("Error fetching catalog:", error);
        throw error;
    }
}

export async function getLatestReleases(
    limit?: number
): Promise<LatestReleasesResponse> {
    try {
        const response: LatestReleasesResponse = await axios
            .get(apiRoutes.latestReleases, {
                params: {
                    limit: limit || 20,
                },
            })
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.error("Error fetching catalog:", error);
        throw error;
    }
}

export async function getAnime(anime: string) {
    try {
        const response: GenresResponse = await axios
            .get(apiRoutes.anime(anime))
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.error("Error fetching anime:", error);
        throw error;
    }
}

export async function getAllGenres(): Promise<GenresResponse> {
    try {
        const response: GenresResponse = await axios
            .get(apiRoutes.genres)
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }
}

export async function getSearchAnimeList(
    query: string
): Promise<SearchAnimeResponse> {
    try {
        const response: SearchAnimeResponse = await axios.get(
            apiRoutes.search,
            {
                params: {
                    query: query,
                    include: "id,name.main,alias,poster.src",
                },
            }
        );
        return response;
    } catch (error) {
        console.error("Error fetching search query:", error);
        throw error;
    }
}

export async function searchAnimeReleases() {
    try {
        const response = await axios.get(
            "https://aniliberty.top/api/v1/anime/catalog/releases",
            {
                params: {
                    page: 1,
                    limit: 15,
                    f: {
                        types: [
                            "TV",
                            "DORAMA",
                            "ONA",
                            "SPECIAL",
                            "WEB",
                            "OVA",
                            "OAD",
                            "MOVIE",
                        ],
                        genres: [24, 32],
                        search: "v",
                        seasons: ["winter", "spring", "summer", "autumn"],
                        age_ratings: [
                            "R0_PLUS",
                            "R6_PLUS",
                            "R12_PLUS",
                            "R16_PLUS",
                            "R18_PLUS",
                        ],
                        years: { from_year: 1990, to_year: 2025 },
                        publish_statuses: ["IS_ONGOING", "IS_NOT_ONGOING"],
                        production_statuses: [
                            "IS_IN_PRODUCTION",
                            "IS_NOT_IN_PRODUCTION",
                        ],
                    },
                },
            }
        );

        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
