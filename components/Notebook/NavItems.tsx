"use client";
import { browserRoutes } from "@/consts/browserRoutes";
import NavButton from "./NavButton";
import { useSelectedLayoutSegment } from "next/navigation";

interface IProps {
    className: string;
    itemsClassName?: string;
}

export default function NavItems({ className, itemsClassName }: IProps) {
    const segment = useSelectedLayoutSegment();

    return (
        <div className={className}>
            <NavButton
                route={browserRoutes.user.notebook.lastWatched}
                className={itemsClassName}
                isActive={segment === "last-watched"}
            >
                Недавно просмотренное
            </NavButton>
            <NavButton
                route={browserRoutes.user.notebook.favorites}
                className={itemsClassName}
                isActive={segment === "favorites"}
            >
                Любимое
            </NavButton>
            <NavButton
                route={browserRoutes.user.notebook.planned}
                className={itemsClassName}
                isActive={segment === "planned"}
            >
                Запланированное
            </NavButton>
            <NavButton
                route={browserRoutes.user.notebook.abandoned}
                className={itemsClassName}
                isActive={segment === "abandoned"}
            >
                Заброшенное
            </NavButton>
        </div>
    );
}
