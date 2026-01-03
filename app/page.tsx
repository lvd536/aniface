import FranchisesList from "@/components/Home/Lists/FranchisesList";
import GenreList from "@/components/Home/Lists/GenreList";
import LatestList from "@/components/Home/Lists/LatestList";
import { browserRoutes } from "@/consts/browserRoutes";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
    return (
        <>
            <div>
                <Link
                    href={browserRoutes.anime.latest}
                    className="flex gap-1 hover:gap-2 items-center"
                >
                    <h1 className="text-xl font-bold">Новые эпизоды</h1>
                    <ChevronRight width={18} height={18} />
                </Link>
                <LatestList />
            </div>
            <div>
                <Link
                    href={browserRoutes.anime.categories}
                    className="flex gap-1 hover:gap-2 items-center"
                >
                    <h1 className="text-xl font-bold">Жанры</h1>
                    <ChevronRight width={18} height={18} />
                </Link>
                <GenreList />
            </div>
            <div>
                <Link
                    href={browserRoutes.anime.franchises}
                    className="flex gap-1 hover:gap-2 items-center"
                >
                    <h1 className="text-xl font-bold">Франшизы</h1>
                    <ChevronRight width={18} height={18} />
                </Link>
                <FranchisesList />
            </div>
        </>
    );
}
