import { User, Settings, LogOut } from "lucide-react";

export default function page() {
    return (
        <>
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
        </>
    );
}
