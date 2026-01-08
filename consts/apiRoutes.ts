const baseUrl = "https://api.anilibria.app/api/v1/";

export const apiRoutes = {
    catalog: baseUrl + "anime/catalog/releases",
    latestReleases: baseUrl + "anime/releases/latest",
    anime: (anime: string) => baseUrl + `anime/releases/${anime}`,
    image: (base: string) => `https://anilibria.tv${base}`,
    genres: baseUrl + "anime/genres",
    genresRandom: baseUrl + "anime/genres/random",
    genreById: (id: number) => baseUrl + `anime/genres/${id}/releases`,
    franchises: baseUrl + "anime/franchises",
    franchise: (id: string) => baseUrl + `anime/franchises/${id}`,
    franchisesRandom: baseUrl + "anime/franchises/random",
    searchReleases: baseUrl + `anime/catalog/releases`,
    appSearchReleases: baseUrl + "app/search/releases",
    episode: (id: string) => baseUrl + `anime/releases/episodes/${id}`,
    genresList: baseUrl + "anime/catalog/references/genres",
    types: baseUrl + "anime/catalog/references/types",
    publishStatuses: baseUrl + "anime/catalog/references/publish-statuses",
    seasons: baseUrl + "anime/catalog/references/seasons",
    years: baseUrl + "anime/catalog/references/years",
    ageRatings: baseUrl + "anime/catalog/references/age-ratings",
} as const;
