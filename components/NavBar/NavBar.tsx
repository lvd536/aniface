import { browserRoutes } from "@/consts/browserRoutes";
import Link from "next/link";
import { User, Search } from "lucide-react";

export default function NavBar() {
    return (
        <nav className="fixed font-mono left-0 top-0 w-screen h-15 bg-black/90 z-2">
            <div className="h-full container items-center mx-auto flex justify-between select-none">
                <ul className="flex gap-3 text-sm font-medium cursor-pointer">
                    <li>
                        <Link href={browserRoutes.home}>Главная</Link>
                    </li>

                    <li>
                        <Link href={browserRoutes.anime.catalog}>Релизы</Link>
                    </li>
                    <li>
                        <Link href={browserRoutes.anime.categories}>
                            Категории
                        </Link>
                    </li>
                </ul>
                <div className="flex gap-1 font-medium">
                    <button
                        type="button"
                        className="flex items-center justify-center w-7.5 h-7.5 bg-foreground/15 rounded-sm hover:bg-foreground/25 transition-bg duration-200"
                    >
                        <Search width={19} height={19} />
                    </button>
                    <Link
                        href={browserRoutes.auth.register}
                        className="flex items-center justify-center w-7.5 h-7.5 bg-foreground/15 rounded-sm hover:bg-foreground/25 transition-bg duration-200"
                    >
                        <User width={19} height={19} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
