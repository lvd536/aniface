"use client";
import ReactPlayer from "react-player";
import {
    MediaController,
    MediaControlBar,
    MediaTimeRange,
    MediaTimeDisplay,
    MediaVolumeRange,
    MediaPlaybackRateButton,
    MediaPlayButton,
    MediaMuteButton,
    MediaFullscreenButton,
} from "media-chrome/react";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    markEpisodeAsWatched,
    markTitleAsWatched,
    saveEpisodeWatchedTime,
} from "@/helpers/supabase";
import QualityInput from "./QualityInput";
import { EpisodeResponse } from "@/types/api.types";

interface IProps {
    animeId: number;
    episode: EpisodeResponse;
    episodesTotal: number;
    startFrom?: number;
}

export default function Player({
    animeId,
    episode,
    episodesTotal,
    startFrom,
}: IProps) {
    const qualitiesSrc = {
        hls_480: episode?.hls_480,
        hls_720: episode?.hls_720,
        hls_1080: episode?.hls_1080,
    };

    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [currentQuality, setCurrentQuality] =
        useState<keyof typeof qualitiesSrc>("hls_480");
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const changeTimeAfterChange = useRef<number | null>(startFrom || null);
    const supabase = createClient();

    useEffect(() => {
        setIsMounted(true);
        setCurrentQuality(
            qualitiesSrc.hls_1080
                ? "hls_1080"
                : qualitiesSrc.hls_720
                  ? "hls_720"
                  : "hls_480",
        );
        console.log(qualitiesSrc)
        const clear = setInterval(updateCloudTime, 5000);
        return () => clearInterval(clear);
    }, []);

    const handleReady = () => {
        if (changeTimeAfterChange.current !== null && playerRef.current) {
            playerRef.current.currentTime = changeTimeAfterChange.current;
            changeTimeAfterChange.current = null;
        }
    };

    const updateCloudTime = async () => {
        if (!playerRef.current) return;
        const { currentTime, duration } = playerRef.current;
        if (!duration || currentTime < 1) return;
        const percentWatched =
            (Math.round(currentTime) / Math.round(duration)) * 100;

        try {
            if (percentWatched >= 80) {
                await markEpisodeAsWatched(
                    episode.id.toString(),
                    episode.ordinal,
                    animeId.toString(),
                    Math.round(currentTime),
                    supabase,
                );
                if (episode.ordinal === episodesTotal)
                    await markTitleAsWatched(
                        episode.id.toString(),
                        episode.ordinal,
                        animeId.toString(),
                        supabase,
                    );
            } else {
                await saveEpisodeWatchedTime(
                    episode.id.toString(),
                    episode.ordinal,
                    animeId.toString(),
                    Math.round(currentTime),
                    supabase,
                );
            }
        } catch (error) {
            console.error("Error saving progress:", error);
        }
    };

    const handleQualityChange = (newQuality: keyof typeof qualitiesSrc) => {
        if (!playerRef.current || newQuality === currentQuality) return;

        changeTimeAfterChange.current = playerRef.current.currentTime;

        setCurrentQuality(newQuality);
    };

    if (!isMounted) {
        return (
            <div
                style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    background: "#000",
                }}
            />
        );
    }
    return (
        <MediaController
            style={{
                width: "100%",
                aspectRatio: "16/9",
            }}
        >
            <ReactPlayer
                slot="media"
                src={qualitiesSrc[currentQuality]!}
                controls={false}
                width="100%"
                height="100%"
                onReady={handleReady}
                ref={playerRef}
            />
            <MediaControlBar>
                <MediaPlayButton />
                <MediaTimeRange />
                <MediaTimeDisplay showDuration />
                <QualityInput
                    currentQuality={currentQuality}
                    qualitiesSrc={qualitiesSrc}
                    handleQualityChange={(e) =>
                        handleQualityChange(e.target.value as any)
                    }
                />
                <MediaMuteButton />
                <MediaVolumeRange />
                <MediaPlaybackRateButton />
                <MediaFullscreenButton />
            </MediaControlBar>
        </MediaController>
    );
}
