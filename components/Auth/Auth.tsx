import { browserRoutes } from "@/consts/browserRoutes";
import { Mail, Send, Lock, LockKeyhole, LogIn } from "lucide-react";
import Link from "next/link";
import LatestReleases from "./LatestReleases";

interface IProps {
    type: "login" | "register";
}

export default async function Auth({ type }: IProps) {
    return (
        <div className="flex items-center justify-center h-screen gap-1">
            <div className="relative w-1/3 max-lg:w-2/3 h-120 bg-foreground/15 rounded-md p-2">
                <h1 className="text-lg font-semibold text-center">
                    Страница {type === "login" ? "Входа" : "Регистрации"}
                </h1>
                <p className="text-xs text-foreground/40 text-center">
                    {type === "login" ? "Войдите в" : "Создайте"} свой аккаунт
                    на AniFace
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
                    {type === "register" && (
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
                    )}
                    <div className="absolute bottom-2 left-0 right-0 flex flex-col gap-2 items-center justify-center">
                        <button
                            type="submit"
                            className="flex transition-bg duration-300 h-10"
                        >
                            <p className="hover:bg-foreground/20 bg-foreground/15 p-2 rounded-l-lg w-60">
                                {type === "login"
                                    ? "Войти"
                                    : "Зарегистрироваться"}
                            </p>
                            <Send className="flex items-center justify-center p-2 rounded-r-lg bg-foreground/5 h-10 w-10" />
                        </button>
                        <Link
                            href={
                                type === "login"
                                    ? browserRoutes.auth.register
                                    : browserRoutes.auth.login
                            }
                            className="flex transition-bg duration-300 h-10"
                        >
                            <p className="flex items-center text-center text-sm hover:bg-foreground/20 bg-foreground/15 p-2 rounded-l-lg w-60">
                                {type === "login"
                                    ? "Еще нет аккаунта? Зарегистрироваться"
                                    : "Уже есть аккаунт? Войти"}
                            </p>
                            <LogIn className="flex items-center justify-center p-2 rounded-r-lg bg-foreground/5 h-10 w-10" />
                        </Link>
                    </div>
                </form>
            </div>
            <LatestReleases />
        </div>
    );
}
