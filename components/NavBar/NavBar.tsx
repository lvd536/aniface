export default function NavBar() {
    return (
        <nav className="fixed left-0 top-0 w-screen h-15 bg-gray-700/90 z-2">
            <div className="h-full container items-center mx-auto flex justify-between select-none">
                <ul className="flex gap-2 text-md font-semibold cursor-pointer">
                    <li>Главная</li>
                    <li>Последние</li>
                    <li>Каталог</li>
                    <li>Поиск</li>
                    <li>Категории</li>
                </ul>
                <div className="flex gap-2">
                    <button>Вход</button>
                    <button>Регистрация</button>
                </div>
            </div>
        </nav>
    );
}
