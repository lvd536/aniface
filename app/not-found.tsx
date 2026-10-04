"use client";

import { browserRoutes } from "@/consts/browserRoutes";
import notfound from "@/public/404.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <main className="relative min-h-[calc(100vh-4rem)] pt-16 flex items-center justify-center px-4 overflow-hidden">
            <div className="anim-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
            <div className="anim-glow absolute top-1/3 left-1/2 -translate-x-1/3 w-75 h-75 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
                <div className="anim-in-1 relative mb-6 flex flex-col items-center">
                    <div className="anim-float relative">
                        <div className="absolute -inset-2 rounded-3xl bg-linear-to-r from-indigo-500/25 to-purple-500/25 blur-xl transition-all duration-700" />
                        <div className="relative rounded-2xl p-4 bg-zinc-900/50 border border-white/10 backdrop-blur-md shadow-2xl">
                            <Image
                                src={notfound}
                                alt="404 Not Found"
                                width={220}
                                height={220}
                                priority
                                className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] select-none pointer-events-none"
                            />
                        </div>
                    </div>
                    <div className="anim-shadow w-36 h-3 bg-indigo-950/80 rounded-[100%] blur-sm mt-3 pointer-events-none" />
                </div>

                <div className="anim-in-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3 backdrop-blur-xs">
                        <Compass className="w-3.5 h-3.5" /> Код ошибки 404
                    </span>
                </div>

                <h1 className="anim-in-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
                    Страница затерялась
                </h1>

                <p className="anim-in-4 text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
                    Похоже, данный эпизод еще не вышел, или ссылка ведет в
                    неизвестное измерение. Не переживайте, всегда можно
                    вернуться назад!
                </p>

                <div className="anim-in-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800/90 border border-white/10 hover:text-white transition-all duration-200 shadow-sm active:scale-95 cursor-pointer backdrop-blur-xs"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Назад
                    </button>

                    <Link
                        href={browserRoutes.home}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/45 active:scale-95 cursor-pointer"
                    >
                        <Home className="w-4 h-4" />
                        На главную
                    </Link>
                </div>
            </div>
        </main>
    );
}
