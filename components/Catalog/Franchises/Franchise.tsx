import Link from "next/link";
import Image from "next/image";
import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import type { FranchiseResponse } from "@/types/api.types";

interface IProps {
    franchiseResponse: FranchiseResponse;
}

export default function Franchise({ franchiseResponse }: IProps) {
    const { franchise_releases, ...franchise } = franchiseResponse;
    return (
        <div className="max-lg:w-full h-40">
            <Link
                href={
                    browserRoutes.anime.franchises +
                    `?franchise=${franchise.id}`
                }
                className="flex rounded-l-lg w-full p-2 bg-black/40 rounded-lg"
            >
                <Image
                    src={apiRoutes.image(franchise.image.preview)}
                    alt="franchise"
                    height={600}
                    width={600}
                    className="w-40 h-40 rounded-lg object-cover"
                />
                <div className="flex flex-col h-40 justify-between w-full rounded-lg px-4 py-2">
                    <div>
                        <h3 className="text-md lg:text-sm font-semibold bottom-6 z-1">
                            {franchise.name}
                        </h3>
                        <p className="hidden lg:block text-sm text-foreground/60 font-medium">
                            {franchise.name_english}
                        </p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <p className="text-sm text-foreground/60 font-medium">
                                {franchise.first_year}
                            </p>
                            {franchise.last_year && (
                                <>
                                    <div className="text-sm text-foreground/60 font-medium">
                                        -
                                    </div>
                                    <p className="text-sm text-foreground/60 font-medium">
                                        {franchise.last_year}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="lg:flex gap-2 items-center">
                            <p className="text-sm text-foreground/60 font-medium">
                                {`Сезонов: ${franchise.total_releases}`}
                            </p>
                            <div className="hidden lg:block w-1 h-1 rounded-full bg-foreground/50" />
                            <p className="text-sm text-foreground/60 font-medium">
                                {`Эпизодов: ${franchise.total_episodes}`}
                            </p>
                        </div>
                        <p className="text-sm text-foreground/60 font-medium">
                            {franchise.total_duration}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
