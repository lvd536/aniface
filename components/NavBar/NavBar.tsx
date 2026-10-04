"use client";

import { browserRoutes } from "@/consts/browserRoutes";
import Link from "next/link";
import { User, Search, LogIn } from "lucide-react";
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

    const navLinks = [
        { href: browserRoutes.home, label: "Главная" },
        { href: browserRoutes.anime.catalog, label: "Релизы" },
        { href: browserRoutes.anime.categories, label: "Категории" },
    ];

    const handleAuth = () => {
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
    };

    return (
        <header className="fixed top-0 inset-x-0 h-16 z-50 bg-zinc-950/75 backdrop-blur-xl border-b border-white/8 transition-all">
            <div className="container mx-auto h-full px-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link
                        href={browserRoutes.home}
                        className="flex items-center gap-2 text-white font-bold tracking-tight text-lg group"
                    >
                        <span className="bg-linear-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                            AniFace
                        </span>
                    </Link>

                    <nav className="hidden sm:flex items-center gap-1.5 text-sm font-medium">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                                        isActive
                                            ? "text-white bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5"
                                    }`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-indigo-500 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        aria-label="Поиск"
                        onClick={() => setIsSearchModalOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800/80 border border-white/5 hover:border-white/10 rounded-full transition-all text-xs"
                    >
                        <Search className="w-4 h-4 text-zinc-400" />
                        <span className="hidden md:inline text-zinc-400">
                            Поиск...
                        </span>
                    </button>

                    {profile ? (
                        <button
                            type="button"
                            onClick={handleAuth}
                            className={`relative flex items-center justify-center w-9 h-9 rounded-full ring-2 transition-all overflow-hidden ${
                                pathname === browserRoutes.user.profile
                                    ? "ring-indigo-500 ring-offset-2 ring-offset-zinc-950"
                                    : "ring-white/10 hover:ring-white/30"
                            }`}
                        >
                            <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white">
                                <User className="w-4 h-4" />
                            </div>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-zinc-950" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleAuth}
                            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
                        >
                            <LogIn className="w-3.5 h-3.5" />
                            <span>Войти</span>
                        </button>
                    )}
                </div>
            </div>

            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </header>
    );
}
