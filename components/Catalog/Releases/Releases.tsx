"use client";
import { useEffect, useState } from "react";
import ReleaseCard from "./ReleaseCard";
import type {
    AnimeCatalogFilters,
    CatalogAnime,
    CatalogResponse,
    Genre,
} from "@/types/api.types";
import { fetchFilters, searchAnimeReleases } from "@/helpers/api";
import CustomSelect from "@/components/CustomSelect";
import ReleaseList from "./ReleaseList";

const initialData: AnimeCatalogFilters = {
    search: "",
    genres: [],
    types: [],
    publish_statuses: [],
    seasons: [],
} as const;

export default function Releases() {
    const [animePage, setAnimeCurrentPage] = useState<number>(1);
    const [animeList, setAnimeList] =
        useState<CatalogResponse<CatalogAnime> | null>(null);
    const [formData, setFormData] = useState<AnimeCatalogFilters>(initialData);
    const [filterData, setFilterData] = useState<{
        genres: Genre[];
        types: { value: string; description: string }[];
        publishStatuses: { value: string; description: string }[];
        seasons: { value: string; description: string }[];
        years: number[];
        ageRatings: { value: string; label: string; description: string }[];
    }>({
        genres: [],
        types: [],
        publishStatuses: [],
        seasons: [],
        years: [],
        ageRatings: [],
    });
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        let aborted = false;
        async function fetchData() {
            try {
                const data = await searchAnimeReleases({
                    page: animePage,
                    limit: 21,
                    f: formData,
                });
                if (aborted) return null;
                return data;
            } catch (error) {
                console.error(error);
                if (!aborted) throw error;
                return null;
            }
        }

        if (fetching) {
            fetchData()
                .then((data) => {
                    if (!data || aborted) return;
                    setAnimeList((prev) => {
                        if (prev && animePage > 1) {
                            return {
                                ...data,
                                data: [...prev.data, ...data.data],
                            } as CatalogResponse<CatalogAnime>;
                        }
                        return data;
                    });

                    setFetching(false);
                    const currentPage =
                        data.meta?.pagination?.current_page ?? animePage;
                    const totalPages =
                        data.meta?.pagination?.total_pages ?? currentPage;
                    if (totalPages > currentPage) {
                        setAnimeCurrentPage((prev) => prev + 1);
                    }
                })
                .catch((err) => {
                    console.error(err);
                    setFetching(false);
                });
        }

        return () => {
            aborted = true;
        };
    }, [fetching, animePage, formData]);

    useEffect(() => {
        function scrollHandler(e: Event) {
            const target = e.target as Document;
            const { documentElement } = target;
            if (
                documentElement.scrollHeight -
                    (documentElement.scrollTop + window.innerHeight) <
                100
            ) {
                setFetching(true);
            }
        }
        document.addEventListener("scroll", scrollHandler);
        fetchFilters().then((data) => {
            if (data) {
                setFilterData(data);
                setFormData((prev) => ({
                    ...prev,
                    years: {
                        from_year: data.years.at(0),
                        to_year: data.years.at(-1),
                    },
                }));
            }
        });
        return () => document.removeEventListener("scroll", scrollHandler);
    }, []);

    return (
        <div className="flex gap-2 items-start justify-between">
            {animeList ? (
                <>
                    <ReleaseList releases={animeList.data} />
                    <form
                        action=""
                        className="max-lg:w-1/2 w-3/10 flex flex-col gap-2 bg-stone-600/25 px-3 py-4 rounded-lg"
                    >
                        <div className="border-b-foreground/20 border-b p-2">
                            <h3 className="text-sm font-medium">Жанры</h3>
                            <p className="text-xs text-foreground/30">
                                Укажите ваши любимые жанры, подстроим наши
                                релизы по ним
                            </p>
                            <CustomSelect
                                isMulti
                                name="genres"
                                options={filterData.genres.map((genre) => ({
                                    label: genre.name,
                                    value: String(genre.id),
                                }))}
                                value={
                                    formData.genres?.map((genreId) => {
                                        const found = filterData.genres.find(
                                            (g) => g.id === genreId
                                        );
                                        return {
                                            label: found?.name || "Загрузка...",
                                            value: String(genreId),
                                        };
                                    }) || []
                                }
                                placeholder="Выберите жанры..."
                                onChange={(newValue) => {
                                    const values = Array.isArray(newValue)
                                        ? newValue.map((opt) =>
                                              Number(opt.value)
                                          )
                                        : [];

                                    setFormData((prev) => ({
                                        ...prev,
                                        genres: values,
                                    }));

                                    setAnimeList(null);
                                    setAnimeCurrentPage(1);
                                    setFetching(true);
                                }}
                            />
                        </div>
                        <div className="border-b-foreground/20 border-b p-2">
                            <h3 className="text-sm font-medium">Тип</h3>
                            <p className="text-xs text-foreground/30">
                                Укажите типы релизов, по которым будут
                                отфильтрованы все релизы
                            </p>
                            <CustomSelect
                                isMulti
                                name="types"
                                options={filterData.types.map((type) => ({
                                    label: type.value,
                                    value: type.value,
                                }))}
                                value={
                                    formData.types?.map((type) => {
                                        const found = filterData.types.find(
                                            (t) => t.value === type
                                        );
                                        return {
                                            label:
                                                found?.value || "Загрузка...",
                                            value: String(type),
                                        };
                                    }) || []
                                }
                                placeholder="Выберите тип..."
                                onChange={(newValue) => {
                                    const values = Array.isArray(newValue)
                                        ? newValue.map((opt) => opt.value)
                                        : [];

                                    setFormData((prev) => ({
                                        ...prev,
                                        types: values,
                                    }));

                                    setAnimeList(null);
                                    setAnimeCurrentPage(1);
                                    setFetching(true);
                                }}
                            />
                        </div>
                        <div className="border-b-foreground/20 border-b p-2">
                            <h3 className="text-sm font-medium">
                                Статус выхода
                            </h3>
                            <p className="text-xs text-foreground/30">
                                Укажите желаемые статусы выхода релиза, по
                                которым будут отфильтрованы все тайтлы в
                                каталоге
                            </p>
                            <CustomSelect
                                isMulti
                                name="types"
                                options={filterData.publishStatuses.map(
                                    (type) => ({
                                        label: type.description,
                                        value: type.value,
                                    })
                                )}
                                value={
                                    formData.publish_statuses?.map((type) => {
                                        const found =
                                            filterData.publishStatuses.find(
                                                (t) => t.value === type
                                            );
                                        return {
                                            label:
                                                found?.description ||
                                                "Загрузка...",
                                            value: String(type),
                                        };
                                    }) || []
                                }
                                placeholder="Выберите статус..."
                                onChange={(newValue) => {
                                    const values = Array.isArray(newValue)
                                        ? newValue.map((opt) => opt.value)
                                        : [];

                                    setFormData((prev) => ({
                                        ...prev,
                                        publish_statuses: values,
                                    }));

                                    setAnimeList(null);
                                    setAnimeCurrentPage(1);
                                    setFetching(true);
                                }}
                            />
                        </div>
                        <div className="border-b-foreground/20 border-b p-2">
                            <h3 className="text-sm font-medium">Сезоны</h3>
                            <p className="text-xs text-foreground/30">
                                Укажите желаемые сезоны выхода релизов, по
                                которым будут отфильтрованы все тайтлы в
                                каталоге
                            </p>
                            <CustomSelect
                                isMulti
                                name="types"
                                options={filterData.seasons.map((type) => ({
                                    label: type.description,
                                    value: type.value,
                                }))}
                                value={
                                    formData.seasons?.map((type) => {
                                        const found = filterData.seasons.find(
                                            (t) => t.value === type
                                        );
                                        return {
                                            label:
                                                found?.description ||
                                                "Загрузка...",
                                            value: String(type),
                                        };
                                    }) || []
                                }
                                placeholder="Выберите сезоны..."
                                onChange={(newValue) => {
                                    const values = Array.isArray(newValue)
                                        ? newValue.map((opt) => opt.value)
                                        : [];

                                    setFormData((prev) => ({
                                        ...prev,
                                        seasons: values,
                                    }));

                                    setAnimeList(null);
                                    setAnimeCurrentPage(1);
                                    setFetching(true);
                                }}
                            />
                        </div>
                        <div className="border-b-foreground/20 border-b p-2">
                            <h3 className="text-sm font-medium">Период</h3>
                            <p className="text-xs text-foreground/30">
                                Укажите года выхода релиза, по которым будут
                                отфильтрованы все тайтлы в каталоге
                            </p>
                            {filterData.years && (
                                <div className="flex gap-2 items-center mt-1">
                                    <input
                                        type="number"
                                        name="from_year"
                                        id="from_year"
                                        className="flex items-center justify-center w-20 bg-foreground/10 focus:bg-foreground/15 transition-all outline-none px-3 py-2 rounded-lg text-sm"
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                years: {
                                                    ...prev.years,
                                                    from_year: Number(
                                                        e.target.value
                                                    ),
                                                },
                                            }));
                                            setAnimeList(null);
                                            setAnimeCurrentPage(1);
                                            setFetching(true);
                                        }}
                                        value={formData.years?.from_year}
                                        min={filterData.years.at(0)}
                                        max={filterData.years.at(-1)}
                                    />
                                    <span className="text-md font-bold text-foreground/20">
                                        -
                                    </span>
                                    <input
                                        type="number"
                                        name="to_year"
                                        id="to_year"
                                        className="flex items-center justify-center w-20 bg-foreground/10 focus:bg-foreground/15 transition-all outline-none px-3 py-2 rounded-lg text-sm"
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                years: {
                                                    ...prev.years,
                                                    to_year: Number(
                                                        e.target.value
                                                    ),
                                                },
                                            }));
                                            setAnimeList(null);
                                            setAnimeCurrentPage(1);
                                            setFetching(true);
                                        }}
                                        value={formData.years?.to_year}
                                        min={filterData.years.at(0)}
                                        max={filterData.years.at(-1)}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="p-2">
                            <h3 className="text-sm font-medium">
                                Возрастной рейтинг
                            </h3>
                            <p className="text-xs text-foreground/30">
                                Укажите допустимы возрстаной рейтинг релизов, по
                                которым будут отфильтрованы все тайтлы
                            </p>
                            <CustomSelect
                                isMulti
                                name="types"
                                options={filterData.ageRatings.map((type) => ({
                                    label: type.label,
                                    value: type.value,
                                }))}
                                value={
                                    formData.age_ratings?.map((type) => {
                                        const found =
                                            filterData.ageRatings.find(
                                                (t) => t.value === type
                                            );
                                        return {
                                            label:
                                                found?.label || "Загрузка...",
                                            value: String(type),
                                        };
                                    }) || []
                                }
                                placeholder="Выберите возраста..."
                                onChange={(newValue) => {
                                    const values = Array.isArray(newValue)
                                        ? newValue.map((opt) => opt.value)
                                        : [];

                                    setFormData((prev) => ({
                                        ...prev,
                                        age_ratings: values,
                                    }));

                                    setAnimeList(null);
                                    setAnimeCurrentPage(1);
                                    setFetching(true);
                                }}
                            />
                        </div>
                    </form>
                </>
            ) : fetching ? (
                <div>Loading anime list!</div>
            ) : (
                <div>Error</div>
            )}
        </div>
    );
}
