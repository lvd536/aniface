import AnimeCard from "@/components/AnimeCard/AnimeCard";
import { getCatalog } from "@/helpers/api";

interface IProps {
    page: number;
}

export default async function Releases({ page }: IProps) {
    const animeCatalog = await getCatalog(page);
    return (
        <div className="flex flex-col min-h-screen items-center justify-between font-sans gap-5">
            <div className="flex flex-wrap justify-center gap-5">
                {animeCatalog.data.map((anime) => (
                    <AnimeCard anime={anime} key={anime.id} />
                ))}
            </div>
            <ul className="flex flex-wrap gap-2 items-center justify-between">
                {Array.from(
                    {
                        length: 10,
                    },
                    (_, index) => {
                        const pageNumber =
                            index + 1 < 10
                                ? index + 1
                                : animeCatalog.meta.pagination.total_pages;
                        if (pageNumber < 10) {
                            return (
                                <li
                                    key={index}
                                    className="flex justify-center items-center w-7 h-7 p-2 bg-gray-500/70 rounded-sm"
                                >
                                    <a
                                        href={`/catalog/releases?page=${pageNumber}`}
                                    >
                                        {pageNumber}
                                    </a>
                                </li>
                            );
                        }
                        return (
                            <li
                                key={index}
                                className="flex justify-center items-center w-7 h-7 p-2 bg-gray-500/70 rounded-sm"
                            >
                                <a
                                    href={`/catalog/releases?page=${animeCatalog.meta.pagination.total_pages}`}
                                >
                                    {animeCatalog.meta.pagination.total_pages}
                                </a>
                            </li>
                        );
                    }
                )}
            </ul>
        </div>
    );
}
