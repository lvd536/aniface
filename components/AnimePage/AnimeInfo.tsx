import { apiRoutes } from "@/consts/apiRoutes";
import { AnimeResponse } from "@/types/api.types";
import Image from "next/image";
import AnimeInfoText from "./AnimeInfoText";

interface IProps {
    anime: AnimeResponse;
}

export default function AnimeInfo({ anime }: IProps) {
    const duration = `${Math.floor(
        (anime.episodes.length * anime.average_duration_of_episode) / 60
    )} часов ${
        (anime.episodes.length * anime.average_duration_of_episode) % 60
    } минут`;
    const genres = anime.genres.map((genre) => (
        <p key={genre.id}>{genre.name}</p>
    ));
    const isOngoing = {
        className: anime.is_ongoing
            ? "text-green-40 ring-green-400"
            : "text-blue-400 ring-blue-400",
        text: anime.is_ongoing ? anime.publish_day.description : "Завершен",
    };
    return (
        <>
            <div className="flex max-sm:flex-col gap-2 sm:gap-5">
                <Image
                    src={apiRoutes.image(anime.poster.preview)}
                    alt="Anime poster"
                    height={1920}
                    width={1080}
                    className="w-80 h-100 rounded-sm"
                />
                <div className="flex flex-col gap-1">
                    <h1 className="font-bold text-4xl text-foreground">
                        {anime.name.main}
                    </h1>
                    <h2 className="font-medium text-xs text-foreground/50">
                        {anime.name.english}
                    </h2>
                    <div className="flex text-xs items-center gap-2">
                        <p className="py-1 px-2 ring ring-indigo-400 rounded-lg">
                            {anime.age_rating.label}
                        </p>
                        <p
                            className={`p-1 px-2 rounded-lg ring ${isOngoing.className}`}
                        >
                            {isOngoing.text}
                        </p>
                    </div>
                    <AnimeInfoText
                        firstText="Тип:"
                        secondText={anime.type.description}
                    />
                    <AnimeInfoText
                        firstText="Сезон:"
                        secondText={anime.season.description}
                    />
                    <AnimeInfoText
                        firstText="Жанры:"
                        secondText={
                            <ul className="flex items-center gap-2">
                                {genres}
                            </ul>
                        }
                    />
                    <AnimeInfoText
                        firstText="Год выхода:"
                        secondText={anime.year}
                    />
                    <AnimeInfoText
                        firstText="Длительность:"
                        secondText={`~${anime.average_duration_of_episode} мин`}
                    />
                    <AnimeInfoText
                        firstText="Общее время просмотра:"
                        secondText={duration}
                    />
                </div>
            </div>
            <p className="text-sm font-medium text-foreground/70">
                {anime.description}
            </p>
        </>
    );
}
