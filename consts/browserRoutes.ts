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
        episode: (id: string) => `/anime/video/${id}`,
    },
    user: {
        profile: "/user/profile",
        notebook: {
            base: "/user/notebook",
            lastWatched: "/user/notebook/last-watched",
            favorites: "/user/notebook/favorites",
            planned: "/user/notebook/planned",
            abandoned: "/user/notebook/abandoned",
        },
        setUsername: "/user/set-username",
    },
    auth: {
        callback: "/auth/callback",
    },
} as const;
