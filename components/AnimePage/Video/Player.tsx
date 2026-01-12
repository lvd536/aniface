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
    MediaSeekBackwardButton,
    MediaSeekForwardButton,
    MediaMuteButton,
    MediaFullscreenButton,
} from "media-chrome/react";
import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import {
    markEpisodeAsWatched,
    markTitleAsWatched,
    saveEpisodeWatchedTime,
} from "@/helpers/supabase";

interface IProps {
    animeId: number;
    episodeId: string;
    episodeNumber: number;
    episodesTotal: number;
    qualitiesSrc: {
        hls_480: string | null;
        hls_720: string | null;
        hls_1080: string | null;
    };
    startFrom?: number;
}

export default function Player({
    qualitiesSrc,
    animeId,
    episodeId,
    episodeNumber,
    episodesTotal,
    startFrom,
}: IProps) {
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const clear = setInterval(updateCloudTime, 5000);
        return () => clearInterval(clear);
    }, []);

    useEffect(() => {
        if (playerRef.current && startFrom) {
            playerRef.current.currentTime = startFrom;
        }
    }, [playerRef.current]);

    const updateCloudTime = async () => {
        if (!playerRef.current) return;
        const { currentTime, duration } = playerRef.current;
        if (!duration || currentTime < 1) return;

        const percentWatched =
            (Math.round(currentTime) / Math.round(duration)) * 100;

        try {
            if (percentWatched >= 80) {
                await markEpisodeAsWatched(
                    episodeId.toString(),
                    episodeNumber,
                    animeId.toString(),
                    Math.round(currentTime),
                    supabase
                );
                if (episodeNumber === episodesTotal)
                    await markTitleAsWatched(
                        episodeId,
                        episodeNumber,
                        animeId.toString(),
                        supabase
                    );
            } else {
                await saveEpisodeWatchedTime(
                    episodeId.toString(),
                    episodeNumber,
                    animeId.toString(),
                    Math.round(currentTime),
                    supabase
                );
            }
        } catch (error) {
            console.error("Error saving progress:", error);
        }
    };

    return (
        <MediaController
            style={{
                width: "100%",
                aspectRatio: "16/9",
            }}
        >
            <ReactPlayer
                slot="media"
                src={qualitiesSrc.hls_480!}
                controls={false}
                width="100%"
                height="100%"
                ref={playerRef}
            />
            <MediaControlBar>
                <MediaPlayButton />
                <MediaSeekBackwardButton seekOffset={10} />
                <MediaSeekForwardButton seekOffset={10} />
                <MediaTimeRange />
                <MediaTimeDisplay showDuration />
                <MediaMuteButton />
                <MediaVolumeRange />
                <MediaPlaybackRateButton />
                <MediaFullscreenButton />
            </MediaControlBar>
        </MediaController>
    );
}
