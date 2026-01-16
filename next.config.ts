import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.anilibria.top",
            },
            {
                protocol: "https",
                hostname: "anilibria.tv",
            },
            {
                protocol: "https",
                hostname: "static.anilibria.tv",
            },
            {
                protocol: "https",
                hostname: "anilibria.tv**",
            },
        ],
    },
};

export default nextConfig;
