import { User } from "lucide-react";
import ProfileHeaderControls from "./ProfileHeaderControls";

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
            <ProfileHeaderControls />
        </div>
    );
}
