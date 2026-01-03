export const browserRoutes = {
    home: "/",
    anime: {
        latest: "/catalog/releases/latest",
        franchises: "/catalog/releases/franchises",
        catalog: "/catalog/releases",
        categories: "/anime/categories",
    },
    auth: { register: "/auth/register", login: "/auth/login" },
    user: { profile: "/user/profile", settings: "/user/settings" },
} as const;
