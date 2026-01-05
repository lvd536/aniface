import GenreCard from "@/components/Home/Lists/Genre/GenreCard";
import { getAllGenres } from "@/helpers/api";

export default async function page() {
    const genres = await getAllGenres();
    return (
        <ul className="flex flex-wrap justify-center gap-9">
            {genres.map((genre) => (
                <li key={genre.id}>
                    <GenreCard genre={genre} />
                </li>
            ))}
        </ul>
    );
}
