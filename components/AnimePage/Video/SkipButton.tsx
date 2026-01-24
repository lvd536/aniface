interface IProps {
    opening: { start?: number; stop?: number };
    ending: { start?: number; stop?: number };
    currentTime: number;
    onSkip: (time: number) => void;
}

export default function SkipButton({
    opening,
    ending,
    currentTime,
    onSkip,
}: IProps) {
    const isOpening =
        opening.start &&
        opening.stop &&
        currentTime >= opening.start &&
        currentTime <= opening.stop;
    const isEnding =
        ending.start &&
        ending.stop &&
        currentTime >= ending.start &&
        currentTime <= ending.stop;

    if (!isOpening && !isEnding) return null;

    return (
        <button
            className="absolute left-1 bottom-12 flex items-center justify-center max-md:text-sm max-md:h-8 font-medium w-30 h-10 rounded-lg bg-black/50"
            onClick={() => onSkip(isOpening ? opening.stop! : ending.stop!)}
        >
            Skip {isOpening ? "opening" : "ending"}
        </button>
    );
}
