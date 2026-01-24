export type AnimeType =
    | "TV"
    | "DORAMA"
    | "ONA"
    | "SPECIAL"
    | "WEB"
    | "OVA"
    | "OAD"
    | "MOVIE";

export type Season = "winter" | "spring" | "summer" | "autumn";

export type AgeRatingValue =
    | "R0_PLUS"
    | "R6_PLUS"
    | "R12_PLUS"
    | "R16_PLUS"
    | "R18_PLUS";

export type PublishStatus = "IS_ONGOING" | "IS_NOT_ONGOING";

export type ProductionStatus = "IS_IN_PRODUCTION" | "IS_NOT_IN_PRODUCTION";

export interface ValueDescription<T = string> {
    value: T;
    description: string;
}

export interface ImageSet {
    src: string;
    preview: string;
    thumbnail: string;
}

export interface Poster extends ImageSet {
    optimized: ImageSet;
}

export interface FilterData {
    genres: Genre[];
    types: {
        value: string;
        description: string;
    }[];
    publishStatuses: {
        value: string;
        description: string;
    }[];
    seasons: {
        value: string;
        description: string;
    }[];
    years: number[];
    ageRatings: {
        value: string;
        label: string;
        description: string;
    }[];
}

export interface AnimeCatalogFilters {
    types?: AnimeType[];
    genres?: number[];
    search: string;
    seasons?: Season[];
    age_ratings?: AgeRatingValue[];
    years?: {
        from_year?: number;
        to_year?: number;
    };
    publish_statuses?: PublishStatus[];
    production_statuses?: ProductionStatus[];
}

export interface AnimeCatalogParams {
    f: AnimeCatalogFilters;
    page?: number;
    limit?: number;
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

export interface CatalogAnime {
    id: number;
    type: ValueDescription<AnimeType>;
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
    poster: Poster;
    fresh_at: string;
    created_at: string;
    updated_at: string;
    is_ongoing: boolean;
    age_rating: {
        value: AgeRatingValue;
        label: string;
        is_adult: boolean;
        description: string;
    };
    genres: Genre[];
    publish_day: ValueDescription<number>;
    description: string;
    episodes_total?: number;
    average_duration_of_episode?: number;
}

export interface AnimeResponse extends CatalogAnime {
    genres: Genre[];
    members: Member[];
    episodes: Episode[];
}

export interface LatestReleaseAnime extends CatalogAnime {
    latest_episode: {
        id: string;
        name: string;
        ordinal: number;
        preview: Poster;
        hls_480: string;
        hls_720: string;
        hls_1080: string;
        duration: number;
        updated_at: string;
        release_id: number;
        name_english: string | null;
    };
}

export interface CatalogResponse<T = CatalogAnime> {
    data: T[];
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

export interface SearchAnime {
    id: number;
    name: {
        main: string;
    };
    alias: string;
    poster: {
        src: string;
    };
}

export interface Franchise {
    id: string;
    name: string;
    name_english: string;
    image: Poster;
    rating: number;
    last_year: number;
    first_year: number;
    total_releases: number;
    total_episodes: number;
    total_duration: number;
    total_duration_in_seconds: number;
}

export interface FranchiseRelease {
    franchise_id: string;
    id: string;
    release: CatalogAnime;
    release_id: number;
    sort_order: number;
}

export type SearchAnimeResponse = SearchAnime[];
export type LatestReleasesResponse = LatestReleaseAnime[];
export type GenresResponse = Genre[];
export type FranchisesResponse = Franchise[];
export interface FranchiseResponse extends Franchise {
    franchise_releases: FranchiseRelease[];
}
export type CatalogAnimeResponse = CatalogAnime[];

interface Member {
    id: string;
    role: ValueDescription;
    nickname: string;
    user: User | null;
}

export interface Episode {
    id: string;
    ordinal: number;
    name: string;
    preview: Poster;
    hls_480: string | undefined;
    hls_720: string | undefined;
    hls_1080: string | undefined;
    duration: number;
    updated_at: string;
    release_id: number;
    name_english: string | null;
}

interface AnimeEpisode extends CatalogAnime {
    episodes: Episode[];
}

export interface EpisodeResponse extends Episode {
    release: AnimeEpisode;
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
