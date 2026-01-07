import { apiRoutes } from "@/consts/apiRoutes";
import {
    AnimeCatalogParams,
    AnimeResponse,
    CatalogAnime,
    CatalogAnimeResponse,
    CatalogResponse,
    EpisodeResponse,
    FranchiseResponse,
    FranchisesResponse,
    GenresResponse,
    LatestReleaseAnime,
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

export async function getAnime(anime: string): Promise<AnimeResponse> {
    try {
        const response: AnimeResponse = await axios
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
export async function getRandomGenres(
    limit: number = 6
): Promise<GenresResponse> {
    try {
        const response: GenresResponse = await axios
            .get(apiRoutes.genresRandom, {
                params: {
                    limit: limit,
                },
            })
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.error("Error fetching genres:", error);
        throw error;
    }
}
export async function getAnimeByGenre(
    genreId: number
): Promise<CatalogAnimeResponse> {
    try {
        const response: CatalogAnimeResponse = await axios
            .get(apiRoutes.genreById(genreId))
            .then((resp) => resp.data.data);
        return response;
    } catch (error) {
        console.error("Error fetching anime by genre:", error);
        throw error;
    }
}
export async function searchAnimeReleases(
    params: AnimeCatalogParams
): Promise<CatalogResponse<LatestReleaseAnime>> {
    try {
        const response: CatalogResponse<LatestReleaseAnime> = await axios.get(
            apiRoutes.searchReleases,
            { params }
        );

        return response;
    } catch (error) {
        console.error("Error searching releases:", error);
        throw error;
    }
}
export async function searchAppReleases(
    query: string
): Promise<CatalogAnime[]> {
    try {
        const response: CatalogAnime[] = await axios
            .get(apiRoutes.searchReleases, {
                params: {
                    query: query,
                },
            })
            .then((resp) => resp.data.data);
        return response;
    } catch (error) {
        console.error("Error searching releases:", error);
        throw error;
    }
}
export async function getAllFranchises(): Promise<FranchisesResponse> {
    try {
        const response: FranchisesResponse = await axios
            .get(apiRoutes.franchises)
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.error("Error fetching franchises:", error);
        throw error;
    }
}
export async function getFranchise(id: string): Promise<FranchiseResponse> {
    try {
        const response: FranchiseResponse = await axios
            .get(apiRoutes.franchise(id))
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.error("Error fetching franchises:", error);
        throw error;
    }
}

export async function getRandomFranchises(
    limit: number = 3
): Promise<FranchisesResponse> {
    try {
        const response: FranchisesResponse = await axios
            .get(apiRoutes.franchisesRandom, {
                params: {
                    limit: limit,
                },
            })
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.error("Error fetching random franchises:", error);
        throw error;
    }
}

export async function getEpisode(id: string): Promise<EpisodeResponse> {
    try {
        const response: EpisodeResponse = await axios
            .get(apiRoutes.episode(id))
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.error("Error fetching episode:", error);
        throw error;
    }
}
