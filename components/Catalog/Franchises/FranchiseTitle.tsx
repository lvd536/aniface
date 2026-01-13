import { CatalogAnime } from "@/types/api.types";
import Link from "next/link";
import Image from "next/image";
import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import FranchiseDetailsItem from "./FranchiseDetailsItem";
import NoImage_9x16 from "@/public/NoImage_9x16.png";

interface IProps {
    franchise: CatalogAnime;
}

async function getSafeImageUrl(url: string) {
    try {
        const res = await fetch(url, { method: "HEAD", cache: "no-store" });
        return res.ok ? url : NoImage_9x16;
    } catch {
        return NoImage_9x16;
    }
}

export default async function FranchiseTitle({ franchise }: IProps) {
    return (
        <div className="max-lg:w-full h-35">
            <Link
                href={browserRoutes.anime.title(franchise.id)}
                className="flex rounded-l-lg w-full"
            >
                <Image
                    src={await getSafeImageUrl(
                        apiRoutes.image(franchise.poster.preview)
                    )}
                    alt="franchise"
                    height={600}
                    width={600}
                    className="w-35 h-35 rounded-lg object-cover"
                />
                <div className="flex flex-col h-35 justify-between w-full rounded-lg px-4 py-2">
                    <div>
                        <h3 className="text-md lg:text-sm font-semibold bottom-6 z-1">
                            {franchise.name.main}
                        </h3>
                        <p className="hidden lg:block text-sm text-foreground/60 font-medium">
                            {franchise.name.english}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <FranchiseDetailsItem separatingCircle>
                            {franchise.year}
                        </FranchiseDetailsItem>
                        <FranchiseDetailsItem separatingCircle>
                            {franchise.season.description}
                        </FranchiseDetailsItem>
                        {franchise.episodes_total ? (
                            <FranchiseDetailsItem separatingCircle>
                                {franchise.type.description}
                            </FranchiseDetailsItem>
                        ) : (
                            <FranchiseDetailsItem>
                                {franchise.type.description}
                            </FranchiseDetailsItem>
                        )}
                        <FranchiseDetailsItem>
                            {`${franchise.episodes_total} Эпизодов`}
                        </FranchiseDetailsItem>
                    </div>
                </div>
            </Link>
        </div>
    );
}
