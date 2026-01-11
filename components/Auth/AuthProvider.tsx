"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useStatsStore } from "@/stores/statsStore";

export function AuthInit() {
    const fetchProfile = useUserStore((s) => s.fetchProfile);
    const fetchStats = useStatsStore((s) => s.fetchStats);
    const { profile } = useUserStore();

    useEffect(() => {
        fetchProfile().then(() => {
            if (profile) {
                fetchStats(profile.id);
            }
        });
    }, [fetchProfile, fetchStats]);

    return null;
}
