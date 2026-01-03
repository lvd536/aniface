import { browserRoutes } from "@/consts/browserRoutes";
import notfound from "@/public/404.png";
import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
    return (
        <div className="w-full flex flex-col gap-3 items-center justify-center">
            <Image src={notfound} alt="okak meme image" className="animate-404-image" />
            <p className="text-6xl font-bold text-shadow-lg text-shadow-indigo-700 animate-404-error">
                404 Not Found
            </p>
            <p className="text-xl font-bold animate-404-description">
                К сожалению такой страницы не суещствует. Предлагаем перейти на
                домашнюю страницу или посетить другой сайт чтобы расслабиться
            </p>
            <div className="flex items-center justify-center gap-2 font-semibold text-lg animate-404-buttons">
                <Link
                    href={browserRoutes.home}
                    className="rounded-sm bg-indigo-400/80 p-2 shadow-md shadow-indigo-700 hover:bg-indigo-400 hover:shadow-lg transition duration-300"
                >
                    Домашняя страница
                </Link>
                <Link
                    href={"https://pornhub.com"}
                    className="rounded-sm bg-indigo-400/80 p-2 shadow-md shadow-indigo-700 hover:bg-indigo-400 hover:shadow-lg transition duration-300"
                >
                    Расслабон
                </Link>
            </div>
        </div>
    );
}
