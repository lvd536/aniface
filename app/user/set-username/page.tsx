"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { browserRoutes } from "@/consts/browserRoutes";

export default function SetUsernamePage() {
    const [username, setUsername] = useState("");
    const [checking, setChecking] = useState(false);
    const [available, setAvailable] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const check = async (val: string) => {
        if (!val || val.trim().length === 0) {
            setAvailable(null);
            return;
        }
        setChecking(true);
        setError(null);
        try {
            const { data, error } = await supabase.rpc(
                "check_username_available",
                { p_username: val }
            );
            if (error) throw error;
            setAvailable(Boolean(data));
        } catch (e: any) {
            setError(e.message || "Ошибка при проверке");
        } finally {
            setChecking(false);
        }
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const { error } = await supabase.rpc("set_username", {
                p_username: username,
            });
            if (error) throw error;
            router.replace(browserRoutes.user.profile);
        } catch (e: any) {
            const msg = (e?.message || "").toString();
            if (msg.includes("username_taken")) {
                setError("Этот username занят — попробуй другой.");
                setAvailable(false);
            } else if (msg.includes("empty_username")) {
                setError("Введите username.");
            } else {
                setError("Не удалось установить username. Попробуй ещё раз.");
            }
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then((data) => {
            if (!data.data.session) {
                router.replace(browserRoutes.home);
            }
        });
    }, []);

    return (
        <form
            onSubmit={submit}
            className="flex flex-col mx-auto bg-foreground/10 rounded-lg p-2 min-w-200 w-1/2"
        >
            <h1 className="text-center text-xl text-foreground/80 font-semibold">
                AniFace
            </h1>
            <p className="text-center text-xs text-foreground/30 font-medium">
                Update your credits
            </p>
            <label className="flex flex-col gap-1 text-sm text-foreground/35 font-medium">
                Username
                <input
                    value={username}
                    className="w-full text-foreground/80 text-base bg-foreground/15 placeholder:font-mono p-2 rounded-lg focus:outline-0 focus:bg-foreground/25 transition-bg duration-300"
                    onChange={(e) => {
                        setUsername(e.target.value);
                        check(e.target.value);
                    }}
                />
            </label>

            <div className="flex items-center justify-center gap-1 my-2">
                <p className="text-xs text-foreground/50 font-medium text-center">
                    Статус:
                </p>
                {checking && (
                    <p className="text-xs text-indigo-600/70 font-medium text-center">
                        Проверяем...
                    </p>
                )}
                {available === true && (
                    <p className="text-xs text-green-400/70 font-medium text-center">
                        Доступно
                    </p>
                )}
                {available === false && (
                    <p className="text-xs text-red-400/70 font-medium text-center">
                        Занято
                    </p>
                )}
                {error && (
                    <p className="text-xs text-red-400/70 font-medium text-center">
                        {error}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="mx-auto p-2 bg-foreground/20 rounded-lg hover:ring hover:ring-indigo-600 hover:bg-foreground/15 transition-[bg, ring] duration-300"
                disabled={checking}
            >
                Сохранить
            </button>
        </form>
    );
}
