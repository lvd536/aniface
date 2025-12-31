export interface CatalogResponse {
    data: {
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
        }
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
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
        }
    }
}