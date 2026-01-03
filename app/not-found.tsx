import { browserRoutes } from "@/consts/browserRoutes";
import notfound from "@/public/404.png";
import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
    return (
        <div className="w-full flex flex-col gap-3 items-center justify-center">
            <Image src={notfound} alt="" />
            <p className="text-xl font-bold">
                К сожалению такой страницы не суещствует. Предлагаем перейти на
                домашнюю страницу или посетить другой сайт чтобы расслабиться
            </p>
            <div className="flex items-center justify-center gap-2 font-semibold text-lg">
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
