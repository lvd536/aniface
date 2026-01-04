import { apiRoutes } from "@/consts/apiRoutes";
import { getAllGenres } from "@/helpers/api";
import Image from "next/image";
export default async function page() {
    const genres = await getAllGenres();
    return (
        <div className="grid grid-cols-1 xs:grid-cols-[repeat(2,200px)] sm:grid-cols-[repeat(5,1fr)] gap-9">
            {genres.map((genre) => (
                <div
                    key={genre.id}
                    className="hover:ring-1 hover:ring-white rounded-t-sm transition-ring duration-300"
                >
                    <Image
                        src={apiRoutes.image(genre.image.preview)}
                        alt="genre"
                        width={150}
                        height={250}
                        className="w-full h-full rounded-t-sm"
                    />
                    <p className="text-md font-semibold px-2 py-1 bg-gray-600 rounded-b-xl">
                        {genre.name}
                    </p>
                </div>
            ))}
        </div>
    );
}
