"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { browserRoutes } from "@/consts/browserRoutes";

export default function page() {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            const userId = session?.user?.id;
            if (!userId) {
                router.replace("/");
                return;
            }

            const { data, error } = await supabase
                .from("users")
                .select("username")
                .eq("id", userId)
                .single();

            if (error) {
                router.replace(browserRoutes.user.setUsername);
                return;
            }

            const username = data?.username;
            if (!username || username.trim() === "") {
                router.replace(browserRoutes.user.setUsername);
            } else {
                router.replace(browserRoutes.home);
            }
        })();
    }, [router]);

    return <p>Signing you in…</p>;
}
