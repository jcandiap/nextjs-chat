import { axiosInstance } from "@/lib/axios";
import { LoginForm } from "@/types/authstore.type";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
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
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            set({ authUser: response.data });
            toast.success("Account created successfully");
        } catch (error:any) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (loginFormData:LoginForm) => {
        set({ isLogingIng: true });
        try {
            const response = await axiosInstance.post("/auth/login", loginFormData);
            set({ authUser: response.data });
            toast.success("Login successfully");
        } catch (error:any) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLogingIng: false });
        }
    },

    logout: async (callback:Function) => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            callback();
        } catch (error:any) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data:any) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: response.data });
            toast.success("Profile updated successfully");
        } catch (error:any) {
            console.log("error in update profile:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    }
}))