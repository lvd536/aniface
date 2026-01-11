export type Database = {
    __InternalSupabase: {
        PostgrestVersion: "14.1";
    };
    public: {
        Tables: {
            anime: {
                Row: {
                    created_at: string | null;
                    genres: string[] | null;
                    id: string;
                    name: string;
                };
                Insert: {
                    created_at?: string | null;
                    genres?: string[] | null;
                    id: string;
                    name: string;
                };
                Update: {
                    created_at?: string | null;
                    genres?: string[] | null;
                    id?: string;
                    name?: string;
                };
                Relationships: [];
            };
            user_titles: {
                Row: {
                    anime_id: string | null;
                    avg_episode_seconds: number | null;
                    end_time: string | null;
                    end_watching: string | null;
                    episodes_count: number | null;
                    genres: string[] | null;
                    id: string;
                    last_watched_episode: number | null;
                    start_watching: string | null;
                    user_id: string | null;
                };
                Insert: {
                    anime_id?: string | null;
                    avg_episode_seconds?: number | null;
                    end_time?: string | null;
                    end_watching?: string | null;
                    episodes_count?: number | null;
                    genres?: string[] | null;
                    id?: string;
                    last_watched_episode?: number | null;
                    start_watching?: string | null;
                    user_id?: string | null;
                };
                Update: {
                    anime_id?: string | null;
                    avg_episode_seconds?: number | null;
                    end_time?: string | null;
                    end_watching?: string | null;
                    episodes_count?: number | null;
                    genres?: string[] | null;
                    id?: string;
                    last_watched_episode?: number | null;
                    start_watching?: string | null;
                    user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "user_titles_anime_id_fkey";
                        columns: ["anime_id"];
                        isOneToOne: false;
                        referencedRelation: "anime";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "user_titles_user_id_fkey";
                        columns: ["user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            users: {
                Row: {
                    id: string;
                    register_date: string;
                    username: string;
                };
                Insert: {
                    id?: string;
                    register_date?: string;
                    username: string;
                };
                Update: {
                    id?: string;
                    register_date?: string;
                    username?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            check_username_available: {
                Args: { p_username: string };
                Returns: boolean;
            };
            get_top3_genres_and_others: {
                Args: { p_user_id: string };
                Returns: {
                    cnt: number;
                    genre: string;
                }[];
            };
            get_total_watched_episodes: {
                Args: { p_user_id: string };
                Returns: number;
            };
            get_total_watched_time_seconds: {
                Args: { p_user_id: string };
                Returns: number;
            };
            set_username: { Args: { p_username: string }; Returns: JSON };
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
    keyof Database,
    "public"
>];

export type Tables<
    DefaultSchemaTableNameOrOptions extends
        | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
              DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
        : never = never
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
          DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
          DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
          DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    DefaultSchemaTableNameOrOptions extends
        | keyof DefaultSchema["Tables"]
        | { schema: keyof DatabaseWithoutInternals },
    TableName extends DefaultSchemaTableNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    DefaultSchemaEnumNameOrOptions extends
        | keyof DefaultSchema["Enums"]
        | { schema: keyof DatabaseWithoutInternals },
    EnumName extends DefaultSchemaEnumNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
    PublicCompositeTypeNameOrOptions extends
        | keyof DefaultSchema["CompositeTypes"]
        | { schema: keyof DatabaseWithoutInternals },
    CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
        schema: keyof DatabaseWithoutInternals;
    }
        ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
        : never = never
> = PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
}
    ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
    : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
    public: {
        Enums: {},
    },
} as const;
