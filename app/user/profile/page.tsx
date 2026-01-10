import CircleChart from "@/components/CircleChart";
import { User, Settings, LogOut } from "lucide-react";

export default function page() {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <User
                        width={55}
                        height={55}
                        className="p-2 ring ring-indigo-500 rounded-full"
                    />
                    <div>
                        <p className="font-semibold">lvd.</p>
                        <p className="text-xs font-medium text-foreground/25">
                            created at 1337.01.01
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Settings
                        width={30}
                        height={30}
                        className="p-1.5 rounded-md bg-foreground/20 hover:bg-foreground/25 transition-bg duration-300"
                    />
                    <LogOut
                        width={30}
                        height={30}
                        className="p-1.5 rounded-md bg-foreground/20 hover:bg-foreground/25 transition-bg duration-300"
                    />
                </div>
            </div>
            <div className="flex max-lg:flex-col w-full gap-2 justify-between">
                <div className="max-lg:w-full w-1/2 h-full bg-foreground/15 justify-between rounded-lg p-2">
                    <h1 className="text-center text-lg font-semibold mb-2">
                        Ваша статистика
                    </h1>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-medium">
                                Просмотрено тайтлов: 11
                            </p>
                            <p className="text-sm font-medium">
                                Общее время просмотра: 1д 12ч 52мин
                            </p>
                            <p className="text-sm font-medium">
                                Серий просмотрено: 666
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <h3 className="text-sm font-medium">
                                График просмотра по жанрам
                            </h3>
                            <CircleChart />
                        </div>
                    </div>
                </div>
                <div className="max-lg:w-full w-1/2 h-full bg-foreground/10 rounded-lg p-2">
                    <h1>Последнее просмотренное</h1>
                </div>
            </div>
        </div>
    );
}
