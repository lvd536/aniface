import AnimeInfo from "@/components/AnimePage/AnimeInfo";
import { getAnime } from "@/helpers/api";
interface IProps {
    params: Promise<{ id: string }>;
}

export default async function page({ params }: IProps) {
    const { id } = await params;
    const anime = await getAnime(id);
    return (
        <div className="w-full h-full flex flex-col gap-2">
            <AnimeInfo anime={anime} />
        </div>
    );
}
