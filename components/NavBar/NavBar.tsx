"use client";

import { browserRoutes } from "@/consts/browserRoutes";
import Link from "next/link";
import { User, Search } from "lucide-react";
import { useState } from "react";
import SearchModal from "../Modals/SearchModal";
import { supabase } from "@/lib/supabase/client";

export default function NavBar() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
    return (
        <nav className="fixed font-mono left-0 top-0 w-screen h-15 bg-black/90 z-2">
            <div className="h-full container items-center mx-auto flex justify-between select-none">
                <ul className="flex gap-3 text-sm font-medium cursor-pointer">
                    <li>
                        <Link href={browserRoutes.home}>Главная</Link>
                    </li>

                    <li>
                        <Link href={browserRoutes.anime.catalog}>Релизы</Link>
                    </li>
                    <li>
                        <Link href={browserRoutes.anime.categories}>
                            Категории
                        </Link>
                    </li>
                </ul>
                <div className="flex gap-2 font-medium">
                    <button
                        type="button"
                        className="flex items-center justify-center w-7.5 h-7.5 bg-foreground/15 rounded-sm hover:bg-foreground/25 transition-bg duration-200"
                        onClick={() => {
                            setIsSearchModalOpen((prev) => !prev);
                        }}
                    >
                        <Search width={19} height={19} />
                    </button>
                    <button
                        type="button"
                        className="flex items-center justify-center w-7.5 h-7.5 bg-foreground/15 rounded-sm hover:bg-foreground/25 transition-bg duration-200"
                        onClick={() =>
                            supabase.auth.signInWithOAuth({
                                provider: "google",
                            })
                        }
                    >
                        <User width={19} height={19} />
                    </button>
                </div>
            </div>
            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => {
                    setIsSearchModalOpen((prev) => !prev);
                }}
            />
        </nav>
    );
}
