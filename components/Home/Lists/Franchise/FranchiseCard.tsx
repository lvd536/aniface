import { browserRoutes } from "@/consts/browserRoutes";
import { Franchise } from "@/types/api.types";
import Link from "next/link";
import { apiRoutes } from "@/consts/apiRoutes";
import imagePlaceholder from "@/public/16x9.png";
import ImageWithFallback from "@/components/ImageWithFallback";

interface IProps {
    franchise: Franchise;
}

export default function FranchiseCard({ franchise }: IProps) {
    return (
        <div className="max-lg:w-full">
            <Link
                href={browserRoutes.anime.franchise(franchise.id)}
                className="flex rounded-l-lg w-full lg:w-120 xl:w-100 2xl:w-120 max-h-85 h-50"
            >
                <ImageWithFallback
                    src={apiRoutes.image(franchise.image.preview)}
                    alt="franchise"
                    height={1920}
                    width={1080}
                    className="w-1/2 h-full rounded-l-lg object-cover"
                    fallbackSrc={imagePlaceholder}
                />
                <div className="flex flex-col justify-between bg-black/40 w-1/2 h-full rounded-r-lg px-4 py-2">
                    <div>
                        <h3 className="text-xs lg:text-sm font-semibold bottom-6 z-1">
                            {franchise.name}
                        </h3>
                        <p className="hidden lg:block text-xs text-foreground/60 font-medium">
                            {franchise.name_english}
                        </p>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <p className="text-xs text-foreground/60 font-medium">
                                {franchise.first_year}
                            </p>
                            {franchise.last_year && (
                                <>
                                    <div className="text-xs text-foreground/60 font-medium">
                                        -
                                    </div>
                                    <p className="text-xs text-foreground/60 font-medium">
                                        {franchise.last_year}
                                    </p>
                                </>
                            )}
                        </div>
                        <div className="lg:flex gap-2 items-center">
                            <p className="text-xs text-foreground/60 font-medium">
                                {`Сезонов: ${franchise.total_releases}`}
                            </p>
                            <div className="hidden lg:block w-1 h-1 rounded-full bg-foreground/50" />
                            <p className="text-xs text-foreground/60 font-medium">
                                {`Эпизодов: ${franchise.total_episodes}`}
                            </p>
                        </div>
                        <p className="text-xs text-foreground/60 font-medium">
                            {franchise.total_duration}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
