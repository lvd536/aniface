import StatusButton from "./StatusButton";
import ToggleTitleWatchedBtn from "./ToggleTitleWatchedBtn";

interface IProps {
    titleStatuses: {
        isWatched: any;
        isPlanned: any;
        isAbandoned: any;
    };
    isTitleWatched: boolean;
    episodesTotal: number;
    animeId: number;
}

export default function StatusButtons({
    titleStatuses,
    animeId,
    episodesTotal,
    isTitleWatched,
}: IProps) {
    return (
        <div className="flex flex-wrap gap-2 mt-1">
            <ToggleTitleWatchedBtn
                animeId={animeId}
                episodesTotal={episodesTotal}
                isTitleWatched={isTitleWatched}
            />
            <StatusButton
                animeId={animeId}
                statusName="isPlanned"
                statusValue={titleStatuses.isPlanned}
            >
                Запланированное
            </StatusButton>
            <StatusButton
                animeId={animeId}
                statusName="isAbandoned"
                statusValue={titleStatuses.isAbandoned}
            >
                Заброшенное
            </StatusButton>
        </div>
    );
}
