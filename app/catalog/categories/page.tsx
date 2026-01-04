import GenreCard from "@/components/Home/Lists/Genre/GenreCard";
import { getAllGenres } from "@/helpers/api";

export default async function page() {
    const genres = await getAllGenres();
    return (
        <div className="grid grid-cols-1 xs:grid-cols-[repeat(2,200px)] sm:grid-cols-[repeat(5,1fr)] gap-9">
            {genres.map((genre) => (
                <GenreCard key={genre.id} genre={genre} />
            ))}
        </div>
    );
}
