import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignUp: false,
    isLogingIng: false,

    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: response.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data:any) => {
        try {
            
        } catch (error) {
            
        }
    }
}))