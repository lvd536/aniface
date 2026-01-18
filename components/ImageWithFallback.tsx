"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image";

interface IProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    fallbackSrc: StaticImageData;
    className?: string;
    loading?: "lazy" | "eager";
}

export default function ImageWithFallback({
    src,
    fallbackSrc,
    alt,
    width,
    height,
    className,
    loading,
}: IProps) {
    const [imgSrc, setImgSrc] = useState<StaticImageData | string>(src);
    return (
        <Image
            alt={alt}
            src={imgSrc}
            className={className}
            width={width}
            height={height}
            onError={() => setImgSrc(fallbackSrc)}
            loading={loading}
        />
    );
}
