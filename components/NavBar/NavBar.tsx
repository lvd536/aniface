import { browserRoutes } from "@/consts/browserRoutes";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="fixed left-0 top-0 w-screen h-15 bg-gray-700/90 z-2">
            <div className="h-full container items-center mx-auto flex justify-between select-none">
                <ul className="flex gap-3 text-md font-semibold cursor-pointer">
                    <li>
                        <Link href={browserRoutes.home}>Главная</Link>
                    </li>
                    <li>
                        <Link href={browserRoutes.anime.latest}>Последние</Link>
                    </li>
                    <li>
                        <Link href={browserRoutes.anime.catalog}>Каталог</Link>
                    </li>
                    <li>
                        <Link href={browserRoutes.anime.search}>Поиск</Link>
                    </li>
                    <li>
                        <Link href={browserRoutes.anime.categories}>
                            Категории
                        </Link>
                    </li>
                </ul>
                <div className="flex gap-1 font-medium">
                    <Link href={browserRoutes.auth.login}>Вход</Link>
                    <span className="mx-1">/</span>
                    <Link href={browserRoutes.auth.register}>Регистрация</Link>
                </div>
            </div>
        </nav>
    );
}
