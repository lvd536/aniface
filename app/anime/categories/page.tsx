import { apiRoutes } from "@/consts/apiRoutes";
import { getAllGenres } from "@/helpers/api";
import Image from "next/image";
export default async function page() {
    const genres = await getAllGenres();
    return (
        <div className="grid grid-cols-1 xs:grid-cols-[repeat(2,200px)] sm:grid-cols-[repeat(5,1fr)] gap-5">
            {genres.map((genre) => (
                <div key={genre.id} className="relative">
                    <Image
                        src={apiRoutes.image(genre.image.preview)}
                        alt=""
                        width={150}
                        height={250}
                        className="w-full h-full"
                    />
                    <div className="absolute left-0 top-0 flex flex-col justify-between items-center opacity-0 hover:opacity-100 bg-black/60 w-full h-full transition-opacity duration-500 py-2">
                        <h1 className="font-semibold text-xl text-center">
                            {genre.name}
                        </h1>
                    </div>
                </div>
            ))}
        </div>
    );
}
