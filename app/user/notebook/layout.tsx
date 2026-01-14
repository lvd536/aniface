import NavButton from "@/components/Notebook/NavButton";
import page from "./page";
import { browserRoutes } from "@/consts/browserRoutes";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex max-md:flex-col w-full h-full md:justify-between gap-2">
            <div className="flex text-xs items-center gap-2 md:hidden w-full h-fit justify-between rounded-lg py-2 px-5 bg-foreground/10">
                <NavButton
                    route={browserRoutes.user.notebook.lastWatched}
                    className="flex h-10 items-center"
                >
                    Последнее просмотренное
                </NavButton>
                <NavButton
                    route={browserRoutes.user.notebook.favorites}
                    className="flex h-10 items-center"
                >
                    Любимое
                </NavButton>
                <NavButton
                    route={browserRoutes.user.notebook.planned}
                    className="flex h-10 items-center"
                >
                    Запланированное
                </NavButton>
                <NavButton
                    route={browserRoutes.user.notebook.abandoned}
                    className="flex h-10 items-center"
                >
                    Брошеное
                </NavButton>
            </div>
            <div className="w-7/10 lg:w-8/10 max-md:w-full h-8/10 rounded-lg p-2 bg-foreground/15 overflow-y-auto">
                {children}
            </div>
            <div className="flex flex-col gap-2 max-md:hidden w-3/10 lg:w-2/10 h-fit rounded-lg p-2 bg-foreground/10">
                <NavButton route={browserRoutes.user.notebook.lastWatched}>
                    Последнее просмотренное
                </NavButton>
                <NavButton route={browserRoutes.user.notebook.favorites}>
                    Любимое
                </NavButton>
                <NavButton route={browserRoutes.user.notebook.planned}>
                    Запланированное
                </NavButton>
                <NavButton route={browserRoutes.user.notebook.abandoned}>
                    Брошеное
                </NavButton>
            </div>
        </div>
    );
}
