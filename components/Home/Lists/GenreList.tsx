import { apiRoutes } from "@/consts/apiRoutes";
import { getRandomGenres } from "@/helpers/api";
import Image from "next/image";
export default async function GenreList() {
    const genres = await getRandomGenres(6);
    return (
        <ul className="grid grid-cols-3 xl:grid-cols-6 justify-between gap-4 mt-2">
            {genres.map((genre) => (
                <li
                    key={genre.id}
                    className="relative rounded-lg w-25 sm:w-30 lg:w-60 xl:w-50 2xl:w-60 max-h-85 min-h-35"
                >
                    <Image
                        src={apiRoutes.image(genre.image.optimized.preview)}
                        alt="genre"
                        height={300}
                        width={150}
                        className="w-full h-full rounded-lg"
                    />
                    <h3 className="absolute w-full text-sm font-bold text-center bottom-6 z-1">
                        {genre.name}
                    </h3>
                    <p className="absolute w-full text-xs text-foreground/60 font-bold text-center bottom-1 z-1">
                        Релизов: {genre.total_releases}
                    </p>
                    <div className="absolute left-0 top-0 w-full h-full card-shadow rounded-lg" />
                </li>
            ))}
        </ul>
    );
}
