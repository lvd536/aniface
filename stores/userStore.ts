import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

type UserProfile = {
    id: string;
    username: string | null;
    register_date: string;
};

type UserState = {
    profile: UserProfile | null;
    isLoading: boolean;
    isInitialized: boolean;
    fetchProfile: () => Promise<void>;
    clear: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    profile: null,
    isLoading: false,
    isInitialized: false,

    fetchProfile: async () => {
        const supabase = createClient();
        set({ isLoading: true });
        const {
            data: { session },
        } = await supabase.auth.getSession();

        const userId = session?.user?.id;
        if (!userId) {
            set({ profile: null, isLoading: false, isInitialized: true });
            return;
        }

        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

        if (!error && data) {
            set({ profile: data, isLoading: false, isInitialized: true });
        } else {
            set({ profile: null, isLoading: false, isInitialized: true });
        }
    },

    clear: () => set({ profile: null, isInitialized: false }),
}));
