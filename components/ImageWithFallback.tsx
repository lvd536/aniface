"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

interface IProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
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
    fill,
    sizes,
    priority,
    className,
    loading,
}: IProps) {
    const [imgSrc, setImgSrc] = useState<StaticImageData | string>(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    if (fill) {
        return (
            <Image
                alt={alt}
                src={imgSrc}
                fill
                sizes={sizes}
                priority={priority}
                className={className}
                onError={() => setImgSrc(fallbackSrc)}
                loading={loading}
            />
        );
    }

    return (
        <Image
            alt={alt}
            src={imgSrc}
            width={width ?? 120}
            height={height ?? 160}
            priority={priority}
            className={className}
            onError={() => setImgSrc(fallbackSrc)}
            loading={loading}
        />
    );
}
