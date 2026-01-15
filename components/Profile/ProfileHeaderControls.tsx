"use client";
import { browserRoutes } from "@/consts/browserRoutes";
import { NotebookTabs, LogOut, UserPen } from "lucide-react";
import ProfileButton from "./ProfileButton";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { useStatsStore } from "@/stores/statsStore";

export default function ProfileHeaderControls() {
    const router = useRouter();
    const { clear } = useUserStore();
    const { resetStats } = useStatsStore();
    const handleLogout = () => {
        const client = createClient();
        client.auth.signOut().then(() => {
            router.replace(browserRoutes.home);
            clear();
            resetStats();
        });
    };
    return (
        <div className="flex gap-2">
            <ProfileButton route={browserRoutes.user.setUsername}>
                <UserPen
                    width={30}
                    height={30}
                    className="p-1.5 rounded-md bg-foreground/20 hover:bg-foreground/25 transition-bg duration-300"
                />
            </ProfileButton>
            <ProfileButton route={browserRoutes.user.notebook.base}>
                <NotebookTabs
                    width={30}
                    height={30}
                    className="p-1.5 rounded-md bg-foreground/20 hover:bg-foreground/25 transition-bg duration-300"
                />
            </ProfileButton>
            <LogOut
                width={30}
                height={30}
                className="p-1.5 rounded-md bg-foreground/20 hover:bg-foreground/25 transition-bg duration-300"
                onClick={handleLogout}
            />
        </div>
    );
}
