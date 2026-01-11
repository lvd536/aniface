"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { browserRoutes } from "@/consts/browserRoutes";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const client = createClient();
    useEffect(() => {
        (async () => {
            const code = searchParams.get("code");

            if (code) {
                const { error } = await client.auth.exchangeCodeForSession(
                    code
                );
                if (error) {
                    console.error("exchangeCodeForSession error:", error);
                    router.replace(browserRoutes.home);
                    return;
                }
            }

            const {
                data: { session },
            } = await client.auth.getSession();

            const userId = session?.user?.id;
            if (!userId) {
                router.replace(browserRoutes.home);
                return;
            }

            const { data, error } = await client
                .from("users")
                .select("username")
                .eq("id", userId)
                .single();

            const username = data?.username;
            const needsSetup =
                error ||
                !username ||
                username.trim() === "" ||
                username.startsWith("temp_");

            if (needsSetup) {
                router.replace(browserRoutes.user.setUsername);
            } else {
                router.replace(browserRoutes.home);
            }
        })();
    }, [router, searchParams]);

    return <p>Signing you in…</p>;
}
