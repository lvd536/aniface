export type SelectOption<T extends string | number = string> = {
    label: string;
    value: T;
};

export type MultiSelectField =
    | "genres"
    | "types"
    | "publish_statuses"
    | "seasons"
    | "age_ratings";
