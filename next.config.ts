import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.anilibria.top",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "**",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
