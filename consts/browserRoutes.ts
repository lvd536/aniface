export const browserRoutes = {
    home: "/",
    anime: {
        title: (anime: string) => {
            return `/anime/${anime}`;
        },
        latest: "/catalog/releases/latest",
        franchises: "/catalog/releases/franchises",
        catalog: "/catalog/releases",
        categories: "/catalog/categories",
        genre: (id: number) => `/catalog/genres/${id}`,
    },
    auth: { register: "/auth/register", login: "/auth/login" },
    user: { profile: "/user/profile", settings: "/user/settings" },
} as const;
