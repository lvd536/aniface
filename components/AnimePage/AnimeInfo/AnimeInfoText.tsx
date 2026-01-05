import { ReactNode } from "react";

interface IProps {
    firstText: string;
    secondText: string | ReactNode;
}

export default function AnimeInfoText({ firstText, secondText }: IProps) {
    return (
        <div className="flex text-sm gap-2">
            <span className="text-foreground/50">{firstText}</span>
            <span>{secondText}</span>
        </div>
    );
}
