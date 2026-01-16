import { ReactNode } from "react";
import AnimeInfoText from "./AnimeInfoText";
import {
    AlarmClock,
    AlarmClockOff,
    Heart,
    HeartMinus,
    Brain,
} from "lucide-react";
import { getTitleStatuses, getTitleWatchStatus } from "@/helpers/supabase";
import { createClient } from "@/lib/supabase/server";
import StatusButtons from "./StatusButtons";
import ToggleTitleWatchedBtn from "./ToggleTitleWatchedBtn";

interface IProps {
    typeDescription: string;
    seasonDescription: string;
    genres: ReactNode;
    year: number;
    average_duration_of_episode?: number;
    episodesTotal: number;
    duration?: string | 0;
    animeId: number;
}

export default async function AnimeInfoDetails({
    typeDescription,
    seasonDescription,
    genres,
    year,
    average_duration_of_episode,
    episodesTotal,
    duration,
    animeId,
}: IProps) {
    const client = await createClient();
    const titleStatuses = await getTitleStatuses(animeId.toString(), client);
    const isTitleWatched = await getTitleWatchStatus(
        animeId.toString(),
        client
    );
    return (
        <>
            <AnimeInfoText firstText="Тип:" secondText={typeDescription} />
            <AnimeInfoText firstText="Сезон:" secondText={seasonDescription} />
            <AnimeInfoText
                firstText="Жанры:"
                secondText={
                    <ul className="flex items-center gap-2">{genres}</ul>
                }
            />
            <AnimeInfoText firstText="Год выхода:" secondText={year} />
            {average_duration_of_episode && (
                <AnimeInfoText
                    firstText="Длительность:"
                    secondText={`~${average_duration_of_episode} мин`}
                />
            )}
            {average_duration_of_episode && duration && (
                <AnimeInfoText
                    firstText="Общее время просмотра:"
                    secondText={duration}
                />
            )}
            {titleStatuses && (
                <>
                    <StatusButtons
                        titleStatuses={titleStatuses}
                        animeId={animeId}
                    />
                    <ToggleTitleWatchedBtn
                        animeId={animeId}
                        episodesTotal={episodesTotal}
                        isTitleWatched={isTitleWatched}
                    />
                </>
            )}
        </>
    );
}
