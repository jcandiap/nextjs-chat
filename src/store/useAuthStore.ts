import { axiosInstance } from "@/lib/axios";
import { LoginForm } from "@/types/authstore.type";
import { User } from "@/types/authuser.type";
import toast from "react-hot-toast";
import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL = 'http://localhost:5001';

interface AuthStore {
    authUser: User | null,
    isSigningUp: boolean,
    isLogingIng: boolean,
    isUpdatingProfile: boolean,
    isCheckingAuth: boolean,
    onlineUsers: Array<any>,
    socket: any,
    checkAuth: () => Promise<void>,
    signup: (data:any) => Promise<void>,
    login: (loginFormData:LoginForm) => Promise<void>,
    logout: (callback:Function) => Promise<void>,
    updateProfile: (data:any) => Promise<void>,
    connectSocket: () => void,
    disconnectSocket: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLogingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: response.data });

            get().connectSocket();
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

            get().connectSocket();
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

            get().connectSocket();
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

            get().disconnectSocket();
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
    },

    connectSocket: () => {
        const { authUser } = get();
        if( !authUser || get().socket?.connected ) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });

        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },

    disconnectSocket: () => {
        if( get().socket?.connected ) get().socket?.disconnect();
    }
}))