export const browserRoutes = {
    home: "/",
    anime: {
        title: (anime: number) => {
            return `/anime/${anime}`;
        },
        latest: "/catalog/releases/latest",
        franchises: "/catalog/releases/franchises",
        franchise: (id: string) => `/catalog/releases/franchises/${id}`,
        catalog: "/catalog/releases",
        categories: "/catalog/categories",
        genre: (id: number) => `/catalog/genres/${id}`,
        episode: (id: string) => `/anime/video/${id}`,
    },
    auth: { register: "/auth/register", login: "/auth/login" },
    user: { profile: "/user/profile", settings: "/user/settings" },
} as const;
