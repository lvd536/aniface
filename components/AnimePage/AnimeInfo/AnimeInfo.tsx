import { apiRoutes } from "@/consts/apiRoutes";
import { AnimeResponse } from "@/types/api.types";
import Image from "next/image";
import AnimeInfoMain from "./AnimeInfoMain";
import AnimeInfoDetails from "./AnimeInfoDetails";

interface IProps {
    anime: AnimeResponse;
}

export default function AnimeInfo({ anime }: IProps) {
    const duration =
        anime.average_duration_of_episode &&
        `${Math.floor(
            (anime.episodes.length * anime.average_duration_of_episode) / 60
        )} часов ${
            (anime.episodes.length * anime.average_duration_of_episode) % 60
        } минут`;
    const genres = anime.genres.map((genre, index) => (
        <li className="flex items-center gap-2" key={genre.id}>
            <p>{genre.name}</p>
            {index !== anime.genres.length - 1 && (
                <span className="w-1.25 h-1.25 bg-foreground rounded-full" />
            )}
        </li>
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
                    className="w-80 h-100 rounded-sm object-cover"
                />
                <div className="flex flex-col gap-1">
                    <AnimeInfoMain
                        name={anime.name}
                        ageLabel={anime.age_rating.label}
                        isOngoing={isOngoing}
                    />
                    <AnimeInfoDetails
                        typeDescription={anime.type.description}
                        seasonDescription={anime.season.description}
                        genres={
                            <ul className="flex items-center gap-2">
                                {genres}
                            </ul>
                        }
                        year={anime.year}
                        average_duration_of_episode={
                            anime.average_duration_of_episode
                        }
                        duration={duration}
                        animeId={anime.id}
                        episodesTotal={anime.episodes.length}
                    />
                </div>
            </div>
            <p className="text-md font-medium text-foreground/70 my-2">
                {anime.description}
            </p>
        </>
    );
}
