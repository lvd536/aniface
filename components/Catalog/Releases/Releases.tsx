"use client";
import { useEffect, useState } from "react";
import ReleaseCard from "./ReleaseCard";
import type {
    AgeRatingValue,
    AnimeCatalogFilters,
    AnimeType,
    CatalogAnime,
    CatalogResponse,
    Genre,
    PublishStatus,
    Season,
} from "@/types/api.types";
import { fetchFilters, getCatalog, searchAnimeReleases } from "@/helpers/api";
import { MultiValue } from "react-select";
import CustomSelect from "@/components/CustomSelect";

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
        types: AnimeType[];
        publishStatuses: PublishStatus[];
        seasons: Season[];
        years: number[];
        ageRatings: AgeRatingValue[];
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
        async function fetchData() {
            try {
                const animeList = await searchAnimeReleases({
                    page: animePage,
                    limit: 21,
                    f: formData,
                });
                return animeList;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
        if (fetching) {
            fetchData().then((data) => {
                if (data) {
                    setAnimeList(data);
                    setFetching(false);
                    if (data.meta.pagination.total_pages > animePage)
                        setAnimeCurrentPage((prev) => prev + 1);
                }
            });
        }
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
            }
        });
        return () => document.removeEventListener("scroll", scrollHandler);
    }, []);

    return (
        <div className="flex gap-2 items-start justify-between">
            {animeList ? (
                <>
                    <ul className="max-lg:w-1/2 w-7/10 flex flex-col justify-center gap-5 bg-stone-600/25 rounded-lg">
                        {animeList.data.map((anime) => (
                            <ReleaseCard release={anime} key={anime.id} />
                        ))}
                    </ul>
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
                        </div>
                        <div className="border-b-foreground/20 border-b p-2">
                            <h3 className="text-sm font-medium">Сезоны</h3>
                            <p className="text-xs text-foreground/30">
                                Укажите желаемые сезоны выхода релизов, по
                                которым будут отфильтрованы все тайтлы в
                                каталоге
                            </p>
                        </div>
                        <div className="border-b-foreground/20 border-b p-2">
                            <h3 className="text-sm font-medium">Период</h3>
                            <p className="text-xs text-foreground/30">
                                Укажите года выхода релиза, по которым будут
                                отфильтрованы все тайтлы в каталоге
                            </p>
                        </div>
                        <div className="p-2">
                            <h3 className="text-sm font-medium">
                                Возрастной рейтинг
                            </h3>
                            <p className="text-xs text-foreground/30">
                                Укажите допустимы возрстаной рейтинг релизов, по
                                которым будут отфильтрованы все тайтлы
                            </p>
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
