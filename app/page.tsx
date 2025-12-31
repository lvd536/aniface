import { apiRoutes } from "@/consts/apiRoutes";
import { getCatalog } from "@/helpers/api";
import Image from "next/image";

export default async function Home() {
    const animeCatalog = await getCatalog();
    return (
        <div className="flex min-h-screen items-center justify-center font-sans">
            <div className="grid grid-cols-1 xs:grid-cols-[repeat(2,200px)] sm:grid-cols-[repeat(5,1fr)] gap-5">
                {animeCatalog.data.map((anime) => (
                    <div key={anime.id} className="group relative">
                        <Image
                            src={apiRoutes.image(anime.poster.preview)}
                            alt=""
                            height={300}
                            width={150}
                            className="w-full h-full"
                        />
                        <div className="absolute left-0 top-0 flex flex-col justify-between items-center opacity-0 hover:opacity-100 bg-black/60 w-full h-full transition-opacity duration-500">
                            <div className="w-full">
                                <div className="flex px-3 py-1 items-center justify-between">
                                    <p className="font-medium bg-indigo-500 py-1 px-2 rounded-sm">
                                        {anime.type.description}
                                    </p>
                                    <p className="font-medium bg-indigo-500 p-1 rounded-sm">
                                        {anime.age_rating.label}
                                    </p>
                                </div>
                                <div className="flex px-3 py-1 items-center justify-between">
                                    <p className="font-medium bg-indigo-500 p-1 rounded-sm">
                                        {anime.season.description}
                                    </p>
                                    <p className="font-medium bg-indigo-500 p-1 rounded-sm">
                                        {anime.year}
                                    </p>
                                </div>
                            </div>
                            <h1 className="font-semibold text-xl text-center">
                                {anime.name.main}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
