export const browserRoutes = {
    home: "/",
    anime: {
        latest: "/catalog/releases/latest",
        catalog: "/catalog/releases",
        search: "/catalog/search",
        categories: "/categories",
    },
    auth: { register: "/auth/register", login: "/auth/login" },
    user: { profile: "/user/profile", settings: "/user/settings" },
} as const;
