"use client";

import { searchAppReleases } from "@/helpers/api";
import { CatalogAnime } from "@/types/api.types";
import { TextSearch, X, VideoOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import SearchItem from "./SearchItem";
import SearchBar from "../SearchBar";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: IProps) {
    const [mounted, setMounted] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState<CatalogAnime[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>("");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResults([]);
            setError(undefined);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        const timeoutId = setTimeout(async () => {
            try {
                const searchedAnime = await searchAppReleases(searchValue);
                if (searchedAnime.length > 0) {
                    setSearchResults(searchedAnime);
                    setError(undefined);
                } else {
                    setSearchResults([]);
                    setError("Не нашли аниме с таким названием");
                }
            } catch (err) {
                setSearchResults([]);
                setError(`Ошибка: ${err}`);
            } finally {
                setIsLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                className="relative my-auto flex flex-col w-full max-w-2xl max-h-[82dvh] h-145 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                style={{
                    animation:
                        "modalEnter 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 p-3.5 sm:p-4 border-b border-white/10 bg-zinc-900/90 shrink-0">
                    <div className="flex-1">
                        <SearchBar
                            id="animeSearch"
                            placeholder="Введите название аниме..."
                            onChange={(e) => setSearchValue(e.target.value)}
                            value={searchValue}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 custom-scrollbar min-h-0">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full min-h-50 text-zinc-400 gap-3">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
                            <p className="text-sm font-medium">
                                Поиск релизов...
                            </p>
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="flex flex-col gap-2">
                            {searchResults.map((anime) => (
                                <SearchItem
                                    key={anime.id}
                                    anime={anime}
                                    onClick={onClose}
                                />
                            ))}
                        </div>
                    ) : searchValue.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full min-h-50 text-center px-4 py-8">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                                <TextSearch className="w-8 h-8" />
                            </div>
                            <h4 className="text-base font-semibold text-zinc-200 mb-1">
                                Начните вводить название
                            </h4>
                            <p className="text-xs sm:text-sm text-zinc-400 max-w-xs">
                                Найдутся фильмы, сериалы, OVA и свежие релизы
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full min-h-50 text-center px-4 py-8">
                            <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-white/10 flex items-center justify-center text-zinc-400 mb-4">
                                <VideoOff className="w-8 h-8" />
                            </div>
                            <h4 className="text-base font-semibold text-zinc-200 mb-1">
                                Ничего не нашлось
                            </h4>
                            <p className="text-xs sm:text-sm text-zinc-400 max-w-xs">
                                {error ||
                                    "Попробуйте изменить поисковый запрос"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
}
