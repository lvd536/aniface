import { MousePointer2Off } from "lucide-react";
export default function EmptyPage() {
    return (
        <div className="h-full w-full p-2 flex flex-col items-center justify-center gap-2">
            <MousePointer2Off
                className="mx-auto stroke-stone-300"
                width={"35%"}
                height={"35%"}
            />
            <div className="text-center">
                <h1 className="text-md font-semibold">Пока что тут пусто!</h1>
                <p className="text-xs font-medium text-foreground/50">
                    Но ты всегда можешь исправить это, если зайдешь на страницу
                    тайтла и добавишь его в любую из категорий
                </p>
            </div>
        </div>
    );
}
