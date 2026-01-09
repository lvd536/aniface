"use client";
import { useEffect } from "react";
import ReleaseList from "./ReleaseList";
import Filters from "./Filters/Filters";
import SearchBar from "@/components/SearchBar";
import { useFilterStore } from "@/types/filterStore";

export default function Releases() {
    const { fetching, formData, setFormData, resetAndFetch, init } =
        useFilterStore();

    useEffect(() => {
        const cleanup = init();
        return cleanup;
    }, [init]);

    return (
        <div className="flex gap-2 items-start justify-between">
            <div className="max-lg:w-1/2 w-7/10 flex flex-col gap-2">
                <SearchBar
                    id="releaseSearch"
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            search: e.target.value,
                        });
                        resetAndFetch();
                    }}
                    placeholder="Введите название аниме..."
                    value={formData.search}
                />
                <ReleaseList />
                {fetching && <p>Fetching...</p>}
            </div>
            <Filters />
        </div>
    );
}
