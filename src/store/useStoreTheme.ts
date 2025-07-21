import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStore = {
    theme: string;
    setTheme: (theme: string) => void;
};

export const useStoreTheme = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: "coffee",
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: "chat-theme", // key en localStorage
        }
    )
);
