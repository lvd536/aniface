import StatusButton from "./StatusButton";

interface IProps {
    titleStatuses: {
        isWatched: any;
        isPlanned: any;
        isAbandoned: any;
    };
    animeId: number;
}

export default function StatusButtons({ titleStatuses, animeId }: IProps) {
    return (
        <div className="flex flex-wrap gap-2 mt-1">
            <StatusButton
                animeId={animeId}
                statusName="isWatched"
                statusValue={titleStatuses.isWatched}
            >
                Просмотренное
            </StatusButton>
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
