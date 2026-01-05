import { ReactNode } from "react";
import AnimeInfoText from "../AnimeInfoText";

interface IProps {
    typeDescription: string;
    seasonDescription: string;
    genres: ReactNode;
    year: number;
    average_duration_of_episode: number;
    duration: string;
}

export default function AnimeInfoDetails({
    typeDescription,
    seasonDescription,
    genres,
    year,
    average_duration_of_episode,
    duration,
}: IProps) {
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
            <AnimeInfoText
                firstText="Длительность:"
                secondText={`~${average_duration_of_episode} мин`}
            />
            <AnimeInfoText
                firstText="Общее время просмотра:"
                secondText={duration}
            />
        </>
    );
}
