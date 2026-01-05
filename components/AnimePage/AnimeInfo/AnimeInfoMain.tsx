interface IProps {
    name: {
        main: string;
        english: string;
        alternative: string | null;
    };
    ageLabel: string;
    isOngoing: {
        className: string;
        text: string;
    };
}

export default function AnimeInfoMain({ name, ageLabel, isOngoing }: IProps) {
    return (
        <>
            <h1 className="font-bold text-4xl text-foreground">{name.main}</h1>
            <h2 className="font-medium text-xs text-foreground/50">
                {name.english}
            </h2>
            <div className="flex text-xs items-center gap-2 my-2">
                <p className="py-1 px-2 ring ring-indigo-400 rounded-lg">
                    {ageLabel}
                </p>
                <p
                    className={`p-1 px-2 rounded-lg ring ${isOngoing.className}`}
                >
                    {isOngoing.text}
                </p>
            </div>
        </>
    );
}
