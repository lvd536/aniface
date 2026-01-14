"use client";

import { browserRoutes } from "@/consts/browserRoutes";
import Link from "next/link";
import { User, Search } from "lucide-react";
import { useState } from "react";
import SearchModal from "../Modals/SearchModal";
import { useUserStore } from "@/stores/userStore";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NavBar() {
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
    const { profile } = useUserStore();
    const router = useRouter();
    const pathname = usePathname();
    const client = createClient();
    return (
        <nav className="fixed font-mono left-0 top-0 w-screen h-15 bg-black/90 z-2">
            <div className="h-full container items-center mx-auto flex justify-between select-none">
                <div className="flex gap-3 text-sm font-medium items-center cursor-pointer">
                    <Link
                        href={browserRoutes.home}
                        className={`transition-bg duration-300 ${
                            pathname === browserRoutes.home &&
                            "p-2 bg-indigo-600/80 rounded-lg"
                        }`}
                    >
                        Главная
                    </Link>

                    <Link
                        href={browserRoutes.anime.catalog}
                        className={`transition-bg duration-300 ${
                            pathname === browserRoutes.anime.catalog &&
                            "p-2 bg-indigo-600/80 rounded-lg"
                        }`}
                    >
                        Релизы
                    </Link>

                    <Link
                        href={browserRoutes.anime.categories}
                        className={`transition-bg duration-300 ${
                            pathname === browserRoutes.anime.categories &&
                            "p-2 bg-indigo-600/80 rounded-lg"
                        }`}
                    >
                        Категории
                    </Link>
                </div>
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
                        className={`flex items-center justify-center w-7.5 h-7.5 bg-foreground/15 rounded-sm hover:bg-foreground/25 transition-[bg, ring] duration-200 ${
                            profile && "bg-green-400/80"
                        } ${
                            pathname === browserRoutes.user.profile &&
                            "ring-1 ring-indigo-600"
                        }`}
                        onClick={() => {
                            if (profile) {
                                router.replace(browserRoutes.user.profile);
                            } else {
                                client.auth.signInWithOAuth({
                                    provider: "google",
                                    options: {
                                        redirectTo: browserRoutes.auth.callback,
                                    },
                                });
                            }
                        }}
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
