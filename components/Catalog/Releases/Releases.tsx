"use client";
import { useEffect } from "react";
import ReleaseList from "./ReleaseList";
import Filters from "./Filters/Filters";
import SearchBar from "@/components/SearchBar";
import { useFilterStore } from "@/stores/filterStore";
import { ListFilter } from "lucide-react";

export default function Releases() {
    const {
        fetching,
        formData,
        showFilters,
        setShowFilters,
        setFormData,
        resetAndFetch,
        init,
    } = useFilterStore();

    useEffect(() => {
        const cleanup = init();
        return cleanup;
    }, [init]);

    return (
        <div className="flex gap-2 items-start justify-between">
            <div className="max-lg:w-full w-7/10 flex flex-col gap-2 transition-all duration-500">
                <div className="flex gap-2 items-center">
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
                    <ListFilter
                        className={`p-2 bg-foreground/10 rounded-lg ${
                            showFilters && "ring ring-indigo-500"
                        } transition-ring duration-300`}
                        width={40}
                        height={40}
                        onClick={() => setShowFilters(!showFilters)}
                    />
                </div>
                <ReleaseList />
                {fetching && <p>Fetching...</p>}
            </div>
            {showFilters && <Filters />}
        </div>
    );
}
