const baseUrl = "https://api.anilibria.app/api/v1/";

export const apiRoutes = {
    catalog: baseUrl + "anime/catalog/releases",
    latestReleases: baseUrl + "anime/releases/latest",
    anime: (anime: string) => baseUrl + `anime/releases/${anime}`,
    image: (base: string) => `https://anilibria.tv${base}`,
    genres: baseUrl + "anime/genres",
} as const;
