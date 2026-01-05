import { getRandomGenres } from "@/helpers/api";
import GenreCard from "./GenreCard";
export default async function GenreList() {
    const genres = await getRandomGenres(6);
    return (
        <div className="flex flex-wrap justify-between gap-4 mt-2">
            {genres.map((genre, index) => (
                <li
                    className={index >= 3 ? "hidden sm:block" : "block"}
                    key={genre.id}
                >
                    <GenreCard genre={genre} />
                </li>
            ))}
        </div>
    );
}
