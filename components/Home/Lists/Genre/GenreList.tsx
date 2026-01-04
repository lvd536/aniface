import { getRandomGenres } from "@/helpers/api";
import GenreCard from "./GenreCard";
export default async function GenreList() {
    const genres = await getRandomGenres(6);
    return (
        <ul className="grid grid-cols-3 xl:grid-cols-6 justify-between gap-4 mt-2">
            {genres.map((genre) => (
                <GenreCard genre={genre} key={genre.id} />
            ))}
        </ul>
    );
}
