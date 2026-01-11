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
    user: { profile: "/user/profile", settings: "/user/settings", setUsername: '/user/set-username' },
    auth: {
        callback: '/auth/callback'
    }
} as const;
