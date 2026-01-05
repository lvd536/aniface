import { ReactNode } from "react";

interface IProps {
    firstText: string;
    secondText: string | ReactNode;
}

export default function AnimeInfoText({ firstText, secondText }: IProps) {
    return (
        <div className="flex text-sm gap-2">
            <p className="text-foreground/50">{firstText}</p>
            <p>{secondText}</p>
        </div>
    );
}
