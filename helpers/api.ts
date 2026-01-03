import { apiRoutes } from "@/consts/apiRoutes";
import {
    CatalogResponse,
    GenresResponse,
    LatestReleasesResponse,
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
