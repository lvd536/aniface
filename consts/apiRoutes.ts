const baseUrl = "https://www.anilibria.top/api/v1/";

export const apiRoutes = {
    catalog: baseUrl + "anime/catalog/releases",
    latestReleases: baseUrl + "anime/releases/latest",
    anime: (anime: string) => baseUrl + `anime/releases/${anime}`,
    image: (base: string) => `https://www.anilibria.top${base}`,
} as const;
