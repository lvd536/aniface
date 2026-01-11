import { browserRoutes } from "@/consts/browserRoutes";
import { User, Settings, LogOut } from "lucide-react";
import Link from "next/link";

interface IProps {
    username: string;
    createdAt: string;
}

export default function ProfileHeader({ username, createdAt }: IProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <User
                    width={55}
                    height={55}
                    className="p-2 ring ring-indigo-500 rounded-full"
                />
                <div>
                    <p className="font-semibold">{username}</p>
                    <p className="text-xs font-medium text-foreground/25">
                        {`created at ${new Date(createdAt).toDateString()}`}
                    </p>
                </div>
            </div>
            <div className="flex gap-2">
                <Link href={browserRoutes.user.settings}>
                    <Settings
                        width={30}
                        height={30}
                        className="p-1.5 rounded-md bg-foreground/20 hover:bg-foreground/25 transition-bg duration-300"
                    />
                </Link>
                <LogOut
                    width={30}
                    height={30}
                    className="p-1.5 rounded-md bg-foreground/20 hover:bg-foreground/25 transition-bg duration-300"
                />
            </div>
        </div>
    );
}
