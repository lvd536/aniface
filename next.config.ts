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
        ],
    },
};

export default nextConfig;
