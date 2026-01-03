export interface CatalogResponse {
    data: CatalogAnime[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
        };
    };
}

export interface AnimeResponse {
    id: number;
    type: {
        value: string;
        description: string;
    };
    year: number;
    name: {
        main: string;
        english: string;
        alternative: string | null;
    };
    alias: string;
    season: {
        value: string;
        description: string;
    };
    poster: {
        src: string;
        preview: string;
        thumbnail: string;
        optimized: {
            src: string;
            preview: string;
            thumbnail: string;
        };
    };
    fresh_at: string;
    created_at: string;
    updated_at: string;
    is_ongoing: boolean;
    age_rating: {
        value: string;
        label: string;
        is_adult: boolean;
        description: string;
    };
    publish_day: {
        value: number;
        description: string;
    };
    description: string;
    episodes_total: number;
    genres: Genre[];
    members: Member[];
    episodes: Episode[];
}
export type GenresResponse = Array<Genre>;
export interface CatalogAnime {
    id: number;
    type: {
        value: string;
        description: string;
    };
    year: number;
    name: {
        main: string;
        english: string;
        alternative: string | null;
    };
    alias: string;
    season: {
        value: string;
        description: string;
    };
    poster: {
        src: string;
        preview: string;
        thumbnail: string;
        optimized: {
            src: string;
            preview: string;
            thumbnail: string;
        };
    };
    fresh_at: string;
    created_at: string;
    updated_at: string;
    is_ongoing: boolean;
    age_rating: {
        value: string;
        label: string;
        is_adult: boolean;
        description: string;
    };
    publish_day: {
        value: number;
        description: string;
    };
    description: string;
    episodes_total: number;
}
export type LatestReleasesResponse = Array<LatestReleaseAnime>;
export interface LatestReleaseAnime extends CatalogAnime {
    latest_episode: {
        id: string;
        name: string;
        ordinal: 12;
        preview: {
            src: string;
            preview: string;
            thumbnail: string;
            optimized: {
                src: string;
                preview: string;
                thumbnail: string;
            };
        };
        hls_480: string;
        hls_720: string;
        hls_1080: string;
        duration: number;
        updated_at: string;
        release_id: number;
        name_english: string | null;
    };
}

export interface Genre {
    id: number;
    name: string;
    image: {
        preview: string;
        thumbnail: string;
        optimized: {
            preview: string;
            thumbnail: string;
        };
    };
    total_releases: number;
}
interface Member {
    id: string;
    role: {
        value: string;
        description: string;
    };
    nickname: string;
    user: User | null;
}
interface Episode {
    id: string;
    name: string | null;
    preview: {
        src: string;
        preview: string;
        thumbnail: string;
        optimized: {
            src: string;
            preview: string;
            thumbnail: string;
        };
    };
    hls_480: string;
    hls_720: string;
    hls_1080: string;
    duration: number;
    updated_at: string;
    release_id: number;
    name_english: string | null;
}
interface User {
    id: number;
    avatar: {
        preview: string;
        thumbnail: string;
        optimized: {
            preview: string;
            thumbnail: string;
        };
    };
}
