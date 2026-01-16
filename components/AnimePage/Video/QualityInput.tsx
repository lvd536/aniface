interface IProps {
    handleQualityChange: React.ChangeEventHandler<HTMLSelectElement>;
    currentQuality: "hls_1080" | "hls_720" | "hls_480";
    qualitiesSrc: {
        hls_480: string | null;
        hls_720: string | null;
        hls_1080: string | null;
    };
}

export default function QualityInput({
    currentQuality,
    qualitiesSrc,
    handleQualityChange,
}: IProps) {
    return (
        <div className="flex items-center bg-transparent text-foreground text-sm font-bold cursor-pointer">
            <select
                value={currentQuality}
                onChange={handleQualityChange}
                className="bg-[#14141eb3] border-none outline-none h-full w-full cursor-pointer p-1"
            >
                {qualitiesSrc.hls_1080 && (
                    <option value="hls_1080" className="font-semibold">
                        1080p
                    </option>
                )}
                {qualitiesSrc.hls_720 && (
                    <option value="hls_720" className="font-semibold">
                        720p
                    </option>
                )}
                {qualitiesSrc.hls_480 && (
                    <option value="hls_480" className="font-semibold">
                        480p
                    </option>
                )}
            </select>
        </div>
    );
}
