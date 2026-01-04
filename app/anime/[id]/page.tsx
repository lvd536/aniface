import { apiRoutes } from "@/consts/apiRoutes";
import { getAnime } from "@/helpers/api";
import Image from "next/image";
interface IProps {
    params: Promise<{ id: string }>;
}

export default async function page({ params }: IProps) {
    const { id } = await params;
    const anime = await getAnime(id);
    return (
        <div className="w-full h-full">
            <div className="flex gap-2 sm:gap-5 justify-between">
                <Image
                    src={apiRoutes.image(anime.poster.preview)}
                    alt="Anime poster"
                    width={200}
                    height={400}
                    className="w-80 h-100 rounded-sm"
                />
                <div>
                    <h1 className="font-bold text-2xl text-foreground">
                        {anime.name.main}
                    </h1>
                    <h2 className="font-medium text-lg text-foreground/50">
                        {anime.name.english}
                    </h2>
                    <p className="text-sm text-foreground/90">
                        {anime.description}
                    </p>
                    <ul className="flex gap-2 mt-3">
                        {anime.genres.map((genre) => (
                            <p
                                key={genre.id}
                                className="p-1 bg-indigo-400 rounded-sm text-xs font-semibold"
                            >
                                {genre.name}
                            </p>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
