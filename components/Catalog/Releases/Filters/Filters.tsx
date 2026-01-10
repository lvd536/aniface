"use client";
import CustomSelect from "@/components/CustomSelect";
import NumberInput from "./NumberInput";
import FilterTitle from "./FilterTitle";
import FilterDescription from "./FilterDescription";
import { MultiValue, SingleValue } from "react-select";
import { useFilterStore } from "@/stores/filterStore";
import { MultiSelectField, SelectOption } from "@/types/filter.types";

export default function Filters() {
    const { filterData, setFormData, formData, resetAndFetch } =
        useFilterStore();
    const handleMultiSelectChange =
        <T extends string | number>(
            field: MultiSelectField,
            parse: (value: string) => T
        ) =>
        (newValue: MultiValue<SelectOption> | SingleValue<SelectOption>) => {
            const arrayValue: SelectOption[] = Array.isArray(newValue)
                ? newValue
                : newValue
                ? [newValue]
                : [];

            const values: T[] = arrayValue.map((opt) => parse(opt.value));

            setFormData({
                ...formData,
                [field]: values,
            });

            resetAndFetch();
        };

    const handleYearChange =
        (key: "from_year" | "to_year") =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(e.target.value);

            setFormData({
                ...formData,
                years: {
                    ...formData.years,
                    [key]: value,
                },
            });

            resetAndFetch();
        };
    const mapIdsToOptions = <T extends string | number>(
        ids: readonly T[] | undefined,
        source: readonly {
            value: T;
            label?: string;
            name?: string;
            description?: string;
        }[],
        getLabel: (item: {
            label?: string;
            name?: string;
            description?: string;
        }) => string
    ): SelectOption[] => {
        if (!ids) return [];

        return ids.map((id) => {
            const found = source.find((item) => item.value === id);

            return {
                value: String(id),
                label: found ? getLabel(found) : "Загрузка...",
            };
        });
    };

    return (
        <form
            action=""
            className="max-lg:fixed max-lg:left-0 max-lg:top-20 max-sm:w-full max-lg:w-1/2 w-3/10 flex flex-col gap-2 max-lg:bg-stone-800 bg-stone-600/25 px-3 py-4 rounded-lg transition-all duration-500 starting:opacity-0 starting:size-0 z-5"
        >
            <div className="border-b-foreground/20 border-b p-2">
                <FilterTitle>Жанры</FilterTitle>
                <FilterDescription>
                    Укажите ваши любимые жанры, подстроим наши релизы по ним
                </FilterDescription>
                <CustomSelect
                    isMulti
                    name="genres"
                    options={filterData.genres.map((genre) => ({
                        label: genre.name,
                        value: String(genre.id),
                    }))}
                    value={mapIdsToOptions(
                        formData.genres,
                        filterData.genres.map((g) => ({
                            value: g.id,
                            name: g.name,
                        })),
                        (i) => i.name!
                    )}
                    placeholder="Выберите жанры..."
                    onChange={handleMultiSelectChange("genres", Number)}
                />
            </div>

            <div className="border-b-foreground/20 border-b p-2">
                <FilterTitle>Тип</FilterTitle>
                <FilterDescription>
                    Укажите типы релизов, по которым будут отфильтрованы все
                    релизы
                </FilterDescription>
                <CustomSelect
                    isMulti
                    name="types"
                    options={filterData.types.map((type) => ({
                        label: type.value,
                        value: type.value,
                    }))}
                    value={mapIdsToOptions(
                        formData.types,
                        filterData.types.map((t) => ({
                            value: t.value,
                            label: t.value,
                        })),
                        (i) => i.label!
                    )}
                    placeholder="Выберите тип..."
                    onChange={handleMultiSelectChange("types", (v) => v)}
                />
            </div>

            <div className="border-b-foreground/20 border-b p-2">
                <FilterTitle>Статус выхода</FilterTitle>
                <FilterDescription>
                    Укажите желаемые статусы выхода релиза, по которым будут
                    отфильтрованы все тайтлы в каталоге
                </FilterDescription>
                <CustomSelect
                    isMulti
                    name="publish_statuses"
                    options={filterData.publishStatuses.map((type) => ({
                        label: type.description,
                        value: type.value,
                    }))}
                    value={mapIdsToOptions(
                        formData.publish_statuses,
                        filterData.publishStatuses.map((t) => ({
                            value: t.value,
                            label: t.description,
                        })),
                        (i) => i.label!
                    )}
                    placeholder="Выберите статус..."
                    onChange={handleMultiSelectChange(
                        "publish_statuses",
                        (v) => v
                    )}
                />
            </div>

            <div className="border-b-foreground/20 border-b p-2">
                <FilterTitle>Сезоны</FilterTitle>
                <FilterDescription>
                    Укажите желаемые сезоны выхода релизов, по которым будут
                    отфильтрованы все тайтлы в каталоге
                </FilterDescription>
                <CustomSelect
                    isMulti
                    name="seasons"
                    options={filterData.seasons.map((type) => ({
                        label: type.description,
                        value: type.value,
                    }))}
                    value={mapIdsToOptions(
                        formData.seasons,
                        filterData.seasons.map((t) => ({
                            value: t.value,
                            label: t.description,
                        })),
                        (i) => i.label!
                    )}
                    placeholder="Выберите сезоны..."
                    onChange={handleMultiSelectChange("seasons", (v) => v)}
                />
            </div>

            <div className="border-b-foreground/20 border-b p-2">
                <FilterTitle>Период</FilterTitle>
                <FilterDescription>
                    Укажите года выхода релиза, по которым будут отфильтрованы
                    все тайтлы в каталоге
                </FilterDescription>
                {filterData.years && (
                    <div className="flex gap-2 items-center mt-1">
                        <NumberInput
                            name="from_year"
                            onChange={handleYearChange("from_year")}
                            value={formData.years?.from_year}
                            min={filterData.years.at(0)}
                            max={filterData.years.at(-1)}
                        />
                        <span className="text-md font-bold text-foreground/20">
                            -
                        </span>
                        <NumberInput
                            name="to_year"
                            onChange={handleYearChange("to_year")}
                            value={formData.years?.to_year}
                            min={filterData.years.at(0)}
                            max={filterData.years.at(-1)}
                        />
                    </div>
                )}
            </div>

            <div className="p-2">
                <FilterTitle>Возрастной рейтинг</FilterTitle>
                <FilterDescription>
                    Укажите допустимы возрстаной рейтинг релизов, по которым
                    будут отфильтрованы все тайтлы
                </FilterDescription>
                <CustomSelect
                    isMulti
                    name="age_ratings"
                    options={filterData.ageRatings.map((type) => ({
                        label: type.label,
                        value: type.value,
                    }))}
                    value={mapIdsToOptions(
                        formData.age_ratings,
                        filterData.ageRatings.map((t) => ({
                            value: t.value,
                            label: t.label,
                        })),
                        (i) => i.label!
                    )}
                    placeholder="Выберите возраста..."
                    onChange={handleMultiSelectChange("age_ratings", (v) => v)}
                />
            </div>
        </form>
    );
}
