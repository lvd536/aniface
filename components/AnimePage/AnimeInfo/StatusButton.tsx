"use client";
import { setTitleStatus } from "@/helpers/supabase";
import { createClient } from "@/lib/supabase/client";
import {
    AlarmClock,
    AlarmClockOff,
    Heart,
    HeartMinus,
    Brain,
} from "lucide-react";

interface IProps extends React.PropsWithChildren {
    animeId: number;
    statusName: "isFavorite" | "isPlanned" | "isAbandoned";
    statusValue: boolean;
}

export default function StatusButton({
    statusName,
    statusValue,
    animeId,
    children,
}: IProps) {
    const Icons = {
        Disabled:
            statusName === "isFavorite"
                ? Heart
                : statusName === "isPlanned"
                ? AlarmClock
                : Brain,
        Enabled:
            statusName === "isFavorite"
                ? HeartMinus
                : statusName === "isPlanned"
                ? AlarmClockOff
                : Brain,
    };
    const client = createClient();
    return (
        <button
            className="flex text-sm hover:bg-foreground/20 transition-bg duration-300 rounded-lg"
            onClick={() => {
                setTitleStatus(
                    animeId.toString(),
                    statusName,
                    !statusValue,
                    client
                ).then(() => document.location.reload());
            }}
        >
            {statusValue ? (
                <Icons.Enabled
                    className={`flex items-center justify-center ${
                        statusValue ? "bg-indigo-600/80" : "bg-foreground/10"
                    } p-2 rounded-l-lg`}
                    width={36}
                    height={36}
                />
            ) : (
                <Icons.Disabled
                    className={`flex items-center justify-center ${
                        statusValue ? "bg-indigo-600/80" : "bg-foreground/10"
                    } p-2 rounded-l-lg`}
                    width={36}
                    height={36}
                />
            )}
            <p className="flex items-center justify-center bg-foreground/15 p-2 rounded-r-lg">
                {children}
            </p>
        </button>
    );
}
