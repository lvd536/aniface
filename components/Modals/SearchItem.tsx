"use client";

import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { CatalogAnime, LatestReleaseAnime } from "@/types/api.types";
import Link from "next/link";
import imagePlaceholder from "@/public/8x8.png";
import ImageWithFallback from "@/components/ImageWithFallback";
import { Calendar, Film, Layers } from "lucide-react";

interface IProps {
    anime: CatalogAnime | LatestReleaseAnime;
    className?: string;
    onClick?: () => void;
}

export default function SearchItem({ anime, className, onClick }: IProps) {
    return (
        <Link
            href={browserRoutes.anime.title(anime.id)}
            onClick={onClick}
            className={`group flex items-center gap-3.5 p-2 sm:p-2.5 rounded-xl bg-white/3 hover:bg-white/8 border border-white/6 hover:border-indigo-500/30 transition-all duration-200 active:scale-[0.99] ${
                className || ""
            }`}
        >
            <div className="relative w-14 sm:w-16 aspect-3/4 shrink-0 rounded-lg overflow-hidden bg-zinc-800 shadow-md">
                <ImageWithFallback
                    src={apiRoutes.image(anime.poster.preview)}
                    alt={anime.name.main}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    fallbackSrc={imagePlaceholder}
                />
            </div>

            <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5 space-y-1.5">
                <div className="space-y-0.5">
                    <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {anime.name.main}
                    </h3>
                    {anime.name.english && (
                        <p className="text-xs text-zinc-400 line-clamp-1">
                            {anime.name.english}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] font-medium text-zinc-400">
                    {anime.year && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-300">
                            <Calendar className="w-3 h-3 text-zinc-400" />
                            {anime.year}
                        </span>
                    )}

                    {anime.type?.description && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-zinc-300">
                            <Film className="w-3 h-3 text-zinc-400" />
                            {anime.type.description}
                        </span>
                    )}

                    {anime.episodes_total && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                            <Layers className="w-3 h-3 text-indigo-400" />
                            {anime.episodes_total} эп.
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
