"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function page() {
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(() => {
            router.replace("/");
        });
    }, [router]);

    return <p>Signing you in…</p>;
}
