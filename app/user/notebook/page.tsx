import { NotebookText } from "lucide-react";
export default function page() {
    return (
        <div className="h-full w-full p-2 flex flex-col items-center justify-center gap-2">
            <NotebookText className="mx-auto" width={"35%"} height={"35%"} />
            <div className="text-center">
                <h1 className="text-md font-semibold">
                    Это мини блокнотик с твоими закладками
                </h1>
                <p className="text-xs font-medium text-foreground/50">
                    Здесь можно смотреть свои закладки и искать то, о чем уже
                    позабыли
                </p>
            </div>
        </div>
    );
}
