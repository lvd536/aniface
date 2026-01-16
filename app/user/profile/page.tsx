"use client";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileLastWatched from "@/components/Profile/ProfileLastWatched";
import ProfileStats from "@/components/Profile/ProfileStats";
import ProfileSkeleton from "@/components/Skeletons/ProfileSkeleton";
import { browserRoutes } from "@/consts/browserRoutes";
import { useStatsStore } from "@/stores/statsStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { profile } = useUserStore();
    const { fetchStats } = useStatsStore();
    const router = useRouter();

    useEffect(() => {
        const clear = setTimeout(() => {
            if (!profile) router.replace(browserRoutes.home);
            else
                fetchStats(profile.id).then(() =>
                    setTimeout(() => setIsLoading(false), 3000)
                );
        }, 500);
        return () => clearTimeout(clear);
    }, [router, profile]);

    return (
        <>
            {profile && !isLoading && (
                <div className="flex flex-col gap-4">
                    <ProfileHeader
                        username={profile.username!}
                        createdAt={profile.register_date}
                    />
                    <div className="flex max-lg:flex-col w-full gap-2 justify-between">
                        <ProfileStats />
                        <ProfileLastWatched />
                    </div>
                </div>
            )}
            {!profile || (isLoading && <ProfileSkeleton />)}
        </>
    );
}
