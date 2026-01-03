import { apiRoutes } from "@/consts/apiRoutes";
import { getRandomFranchises } from "@/helpers/api";
import Image from "next/image";
export default async function FranchisesList() {
    const franchises = await getRandomFranchises(3);
    return (
        <ul className="flex items-center justify-between gap-4 mt-2">
            {franchises.map((franchise) => (
                <li
                    key={franchise.id}
                    className="flex rounded-l-lg w-50 sm:w-60 lg:w-120 xl:w-100 2xl:w-120 max-h-85 h-50"
                >
                    <Image
                        src={apiRoutes.image(franchise.image.optimized.preview)}
                        alt=""
                        height={300}
                        width={150}
                        className="w-1/2 h-full rounded-l-lg object-cover"
                    />
                    <div className="flex flex-col justify-between bg-black/40 w-1/2 h-full rounded-r-lg px-4 py-2">
                        <div>
                            <h3 className="text-sm font-semibold bottom-6 z-1">
                                {franchise.name}
                            </h3>
                            <p className="text-xs text-foreground/60 font-medium">
                                {franchise.name_english}
                            </p>
                            <p className="text-xs text-foreground/60 font-medium">
                                Релизов: {franchise.total_releases}
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
                            <div className="flex gap-2 items-center">
                                <p className="text-xs text-foreground/60 font-medium">
                                    {`Сезонов: ${franchise.total_releases}`}
                                </p>
                                <div className="w-1 h-1 rounded-full bg-foreground/50" />
                                <p className="text-xs text-foreground/60 font-medium">
                                    {`Эпизодов: ${franchise.total_episodes}`}
                                </p>
                            </div>
                            <p className="text-xs text-foreground/60 font-medium">
                                {franchise.total_duration}
                            </p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
