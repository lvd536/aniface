import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { getLatestReleases } from "@/helpers/api";
import { Mail, Lock, LockKeyhole, Send, LogIn } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function page() {
    const latestAnime = await getLatestReleases(3);
    return (
        <div className="flex items-center justify-center h-screen gap-1">
            <div className="relative w-1/3 max-lg:w-2/3 h-120 bg-foreground/15 rounded-md p-2">
                <h1 className="text-lg font-semibold text-center">
                    Страница регистрации
                </h1>
                <p className="text-xs text-foreground/40 text-center">
                    Создайте свой аккаунт в AniFace
                </p>
                <form action="" className="flex flex-col gap-2">
                    <div>
                        <label
                            htmlFor="email"
                            className="text-xs text-foreground/35"
                        >
                            Email
                        </label>
                        <span className="flex focus-within:bg-foreground/20 bg-foreground/15 items-center p-2 rounded-lg gap-2 focus-within:ring-1 focus-within:ring-indigo-500 focus:ring-1 transition-[bg, ring] duration-300">
                            <Mail className="select-none" />
                            <input
                                id="email"
                                type="mail"
                                className="w-full h-full outline-none"
                            />
                        </span>
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="text-xs text-foreground/35"
                        >
                            Password
                        </label>
                        <span className="flex focus-within:bg-foreground/20 bg-foreground/15 items-center p-2 rounded-lg gap-2 focus-within:ring-1 focus-within:ring-indigo-500 focus:ring-1 transition-[bg, ring] duration-300">
                            <Lock className="select-none" />
                            <input
                                id="password"
                                type="password"
                                className="w-full h-full outline-none"
                            />
                        </span>
                    </div>
                    <div>
                        <label
                            htmlFor="passwordConfirmation"
                            className="text-xs text-foreground/35"
                        >
                            Confirm your password
                        </label>
                        <span className="flex focus-within:bg-foreground/20 bg-foreground/15 items-center p-2 rounded-lg gap-2 focus-within:ring-1 focus-within:ring-indigo-500 focus:ring-1 transition-[bg, ring] duration-300">
                            <LockKeyhole className="select-none" />
                            <input
                                id="passwordConfirmation"
                                type="password"
                                className="w-full h-full outline-none"
                            />
                        </span>
                    </div>
                    <div className="absolute bottom-2 left-0 right-0 flex flex-col gap-2 items-center justify-center">
                        <button
                            type="submit"
                            className="flex transition-bg duration-300 h-10"
                        >
                            <p className="hover:bg-foreground/20 bg-foreground/15 p-2 rounded-l-lg w-60">
                                Зарегистрироваться
                            </p>
                            <Send className="flex items-center justify-center p-2 rounded-r-lg bg-foreground/5 h-10 w-10" />
                        </button>
                        <Link
                            href={browserRoutes.auth.login}
                            className="flex transition-bg duration-300 h-10"
                        >
                            <p className="text-center hover:bg-foreground/20 bg-foreground/15 p-2 rounded-l-lg w-60">
                                Уже есть аккаунт? Вход
                            </p>
                            <LogIn className="flex items-center justify-center p-2 rounded-r-lg bg-foreground/5 h-10 w-10" />
                        </Link>
                    </div>
                </form>
            </div>
            <div className="max-lg:hidden w-1/3 h-120 bg-foreground/10 rounded-md p-2">
                <h1 className="text-lg font-semibold text-center">
                    Последние релизы
                </h1>
                <p className="text-xs text-foreground/40 text-center mb-2">
                    Недавно вышедшие аниме
                </p>
                {latestAnime.map((anime) => (
                    <Link
                        href={browserRoutes.anime.title(anime.id)}
                        className="flex min-h-20 gap-3 items-center justify-start px-3 py-4 hover:bg-foreground/25 rounded-lg transition-bg duration-300"
                        key={anime.id}
                    >
                        <Image
                            src={apiRoutes.image(anime.poster.preview)}
                            width={1080}
                            height={1920}
                            alt="anime poster"
                            className="max-md:hidden min-w-17 max-w-17 h-full rounded-lg object-cover"
                        />
                        <div className="flex flex-col gap-2">
                            <div>
                                <p className="text-sm font-semibold">
                                    {anime.name.main}
                                </p>
                                <p className="text-xs font-medium text-foreground/30">
                                    {anime.name.english}
                                </p>
                            </div>
                            <div className="flex flex-col text-xs">
                                <ul className="flex flex-wrap gap-2 text-foreground/30">
                                    {anime.genres.map((genre, index) => (
                                        <li
                                            key={genre.id}
                                            className="flex items-center gap-1"
                                        >
                                            {genre.name}
                                            {index !==
                                                anime.genres.length - 1 && (
                                                <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex gap-2 items-center text-foreground/40">
                                    <p>{anime.year}</p>
                                    <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                                    <p>{anime.season.description}</p>
                                    <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                                    <p>{anime.type.description}</p>
                                    <span className="block w-1 h-1 rounded-full bg-foreground/50" />
                                    <p>{anime.age_rating.label}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
