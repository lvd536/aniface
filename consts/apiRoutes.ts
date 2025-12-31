const baseUrl = "https://www.anilibria.top/api/v1/";

export const apiRoutes = {
    catalog: baseUrl + "anime/catalog/releases",
    anime: (anime: string) => baseUrl + `anime/releases/${anime}`,
} as const;
