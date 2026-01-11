"use client";
import CircleChart from "@/components/CircleChart";
import { browserRoutes } from "@/consts/browserRoutes";
import { useStatsStore } from "@/stores/statsStore";
import { useUserStore } from "@/stores/userStore";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { profile } = useUserStore();
    const { totalEpisodes, topGenres, totalSeconds, totalTitles } =
        useStatsStore();
    const router = useRouter();

    useEffect(() => {
        const clear = setTimeout(() => {
            if (!profile) router.replace(browserRoutes.home);
            else setIsLoading(false);
        }, 500);
        return () => clearTimeout(clear);
    }, [router, profile]);

    return (
        <>
            {profile && !isLoading && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                            <User
                                width={55}
                                height={55}
                                className="p-2 ring ring-indigo-500 rounded-full"
                            />
                            <div>
                                <p className="font-semibold">
                                    {profile.username}
                                </p>
                                <p className="text-xs font-medium text-foreground/25">
                                    {`created at 
                                    ${new Date(
                                        profile.register_date
                                    ).toDateString()}`}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Link href={browserRoutes.user.settings}>
                                <Settings
                                    width={30}
                                    height={30}
                                    className="p-1.5 rounded-md bg-foreground/20 hover:bg-foreground/25 transition-bg duration-300"
                                />
                            </Link>
                            <LogOut
                                width={30}
                                height={30}
                                className="p-1.5 rounded-md bg-foreground/20 hover:bg-foreground/25 transition-bg duration-300"
                            />
                        </div>
                    </div>
                    <div className="flex max-lg:flex-col w-full gap-2 justify-between">
                        <div className="max-lg:w-full w-1/2 h-full bg-foreground/15 justify-between rounded-lg p-2">
                            <h1 className="text-center text-lg font-semibold mb-2">
                                Ваша статистика
                            </h1>
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm font-medium">
                                        Просмотрено тайтлов: {totalTitles}
                                    </p>
                                    <p className="text-sm font-medium">
                                        Общее время просмотра: {totalSeconds}
                                    </p>
                                    <p className="text-sm font-medium">
                                        Серий просмотрено: {totalEpisodes}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <h3 className="text-sm font-medium">
                                        График просмотра по жанрам
                                    </h3>
                                    <CircleChart />
                                </div>
                            </div>
                        </div>
                        <div className="max-lg:w-full w-1/2 h-full bg-foreground/10 rounded-lg p-2">
                            <h1>Последнее просмотренное</h1>
                        </div>
                    </div>
                </div>
            )}
            {!profile || (isLoading && <p>Loading...</p>)}
        </>
    );
}
