"use client";

import { useState } from "react";
import NavButton from "./NavButton";
import LastWatched from "./LastWatched";
import Favorites from "./Favorites";
import Planned from "./Planned";
import Abandoned from "./Abandoned";

export default function Notebook() {
    const [page, setPage] = useState<number>(0);

    return (
        <div className="flex max-md:flex-col w-full h-full md:justify-between gap-2">
            <div className="flex text-xs items-center gap-2 md:hidden w-full h-fit justify-between rounded-lg py-2 px-5 bg-foreground/10">
                <NavButton
                    page={page}
                    targetPage={0}
                    onClick={() => setPage(0)}
                    className="h-10"
                >
                    Последнее просмотренное
                </NavButton>
                <NavButton
                    page={page}
                    targetPage={1}
                    onClick={() => setPage(1)}
                    className="h-10"
                >
                    Любимое
                </NavButton>
                <NavButton
                    page={page}
                    targetPage={2}
                    onClick={() => setPage(2)}
                    className="h-10"
                >
                    Запланированное
                </NavButton>
                <NavButton
                    page={page}
                    targetPage={3}
                    onClick={() => setPage(3)}
                    className="h-10"
                >
                    Брошеное
                </NavButton>
            </div>
            <div className="w-7/10 lg:w-8/10 max-md:w-full h-8/10 rounded-lg p-2 bg-foreground/15">
                {page === 0 && <LastWatched />}
                {page === 1 && <Favorites />}
                {page === 2 && <Planned />}
                {page === 3 && <Abandoned />}
            </div>
            <div className="flex flex-col gap-2 max-md:hidden w-3/10 lg:w-2/10 h-fit rounded-lg p-2 bg-foreground/10">
                <NavButton
                    page={page}
                    targetPage={0}
                    onClick={() => setPage(0)}
                >
                    Последнее просмотренное
                </NavButton>
                <NavButton
                    page={page}
                    targetPage={1}
                    onClick={() => setPage(1)}
                >
                    Любимое
                </NavButton>
                <NavButton
                    page={page}
                    targetPage={2}
                    onClick={() => setPage(2)}
                >
                    Запланированное
                </NavButton>
                <NavButton
                    page={page}
                    targetPage={3}
                    onClick={() => setPage(3)}
                >
                    Брошеное
                </NavButton>
            </div>
        </div>
    );
}
