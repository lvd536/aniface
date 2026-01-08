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
    Genre,
    AnimeType,
    AgeRatingValue,
    Season,
    PublishStatus,
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
                    limit: limit,
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
                    limit: limit || 49,
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
): Promise<CatalogResponse<CatalogAnime>> {
    try {
        const response: CatalogResponse<CatalogAnime> = await axios
            .get(apiRoutes.searchReleases, { params })
            .then((data) => data.data);

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
            .get(apiRoutes.appSearchReleases, {
                params: {
                    query: query,
                },
            })
            .then((resp) => resp.data);
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
async function fetchGenres(): Promise<Genre[]> {
    try {
        const response: Genre[] = await axios
            .get(apiRoutes.genresList)
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function fetchTypes(): Promise<AnimeType[]> {
    try {
        const response: AnimeType[] = await axios
            .get(apiRoutes.types)
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function fetchPublishStatus(): Promise<PublishStatus[]> {
    try {
        const response: PublishStatus[] = await axios
            .get(apiRoutes.publishStatuses)
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function fetchSeasons(): Promise<Season[]> {
    try {
        const response: Season[] = await axios
            .get(apiRoutes.seasons)
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function fetchYears(): Promise<number[]> {
    try {
        const response: number[] = await axios
            .get(apiRoutes.years)
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function fetchAgeRatings(): Promise<AgeRatingValue[]> {
    try {
        const response: AgeRatingValue[] = await axios
            .get(apiRoutes.ageRatings)
            .then((resp) => resp.data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function fetchFilters(): Promise<{
    genres: Genre[];
    types: AnimeType[];
    publishStatuses: PublishStatus[];
    seasons: Season[];
    years: number[];
    ageRatings: AgeRatingValue[];
}> {
    try {
        const [genres, types, publishStatuses, seasons, years, ageRatings] =
            await Promise.all([
                fetchGenres(),
                fetchTypes(),
                fetchPublishStatus(),
                fetchSeasons(),
                fetchYears(),
                fetchAgeRatings(),
            ]);
        return {
            genres,
            types,
            publishStatuses,
            seasons,
            years,
            ageRatings,
        };
    } catch (error) {
        console.log("Error fetching filters:", error);
        throw error;
    }
}
