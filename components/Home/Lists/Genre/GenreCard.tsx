"use client";
import { apiRoutes } from "@/consts/apiRoutes";
import { browserRoutes } from "@/consts/browserRoutes";
import { useFilterStore } from "@/stores/filterStore";
import { Genre } from "@/types/api.types";
import { useRouter } from "next/navigation";
import imagePlaceholder from "@/public/9x16.png";
import ImageWithFallback from "@/components/ImageWithFallback";

interface IProps {
    genre: Genre;
}

export default function GenreCard({ genre }: IProps) {
    const { formData, setFormData } = useFilterStore();
    const router = useRouter();
    return (
        <>
            <button
                type="button"
                className="relative rounded-lg min-w-47 max-w-47 h-72"
                onClick={() => {
                    setFormData({
                        ...formData,
                        genres: [genre.id],
                    });
                    router.replace(browserRoutes.anime.catalog);
                }}
            >
                <ImageWithFallback
                    src={apiRoutes.image(genre.image.preview)}
                    alt="genre"
                    height={1920}
                    width={1080}
                    className="min-w-47 max-w-47 h-72 rounded-lg object-cover"
                    fallbackSrc={imagePlaceholder}
                />
                <h3 className="absolute min-w-47 max-w-47 text-sm font-semibold text-center bottom-6 z-1">
                    {genre.name}
                </h3>
                <p className="absolute min-w-47 max-w-47 text-xs text-foreground/60 font-medium text-center bottom-1 z-1">
                    {`Релизов: ${genre.total_releases}`}
                </p>
                <div className="absolute left-0 top-0 min-w-47 max-w-47 h-72 card-shadow rounded-lg" />
            </button>
        </>
    );
}
