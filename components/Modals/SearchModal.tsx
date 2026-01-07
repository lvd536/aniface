"use client";
import { searchAppReleases } from "@/helpers/api";
import { CatalogAnime } from "@/types/api.types";
import { TextSearch, X, VideoOff } from "lucide-react";
import { useEffect, useState } from "react";
import SearchItem from "./SearchItem";
import SearchBar from "../SearchBar";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: IProps) {
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<CatalogAnime[]>([]);
    const [error, setError] = useState<string | undefined>("");

    useEffect(() => {
        async function handleSearch(): Promise<{
            response: CatalogAnime[];
            error: string | undefined;
        }> {
            try {
                setSearchResults([]);
                setError(undefined);
                const searchedAnime = await searchAppReleases(searchValue);
                if (searchedAnime.length > 0) {
                    return {
                        response: searchedAnime,
                        error: undefined,
                    };
                }
                return {
                    response: searchedAnime,
                    error: "Не нашли аниме с таким названием",
                };
            } catch (error) {
                return {
                    response: [],
                    error: `Ошибка: ${error}`,
                };
            }
        }

        if (searchValue.length > 0) {
            handleSearch().then(({ response, error }) => {
                setSearchResults(response);
                setError(error);
            });
        }
    }, [searchValue]);
    return (
        <>
            {isOpen && (
                <div className="fixed flex w-screen h-screen top-0 left-0 justify-center items-center gap-4 bg-black/70">
                    <div className="relative flex flex-col items-center rounded-lg bg-neutral-800/90 px-2 pt-2 w-150 h-200 backdrop-blur-xs">
                        <SearchBar
                            id="animeSearch"
                            placeholder="Введите название аниме..."
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                        <div className="w-full h-full flex justify-center group overflow-y-auto my-2">
                            {searchResults.length > 0 ? (
                                <div className="flex flex-col gap-2">
                                    {searchResults.map((anime) => (
                                        <SearchItem
                                            key={anime.id}
                                            anime={anime}
                                        />
                                    ))}
                                </div>
                            ) : searchValue.length <= 0 ? (
                                <div className="flex flex-col font-mono justify-center items-center">
                                    <TextSearch width={150} height={150} />
                                    <p className="text-sm">
                                        Введите название аниме
                                    </p>
                                    <p className="text-xs text-foreground/40">
                                        Результаты поиска появятся тут
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col font-mono text-sm justify-center items-center">
                                    <VideoOff width={150} height={150} />
                                    <p>Нет подходящих результатов</p>
                                    <p className="text-foreground/40">
                                        {error}
                                    </p>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            className="absolute top-0 -right-15 self-start"
                            onClick={onClose}
                        >
                            <X width={35} height={35} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
