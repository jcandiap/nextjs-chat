import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { User } from "@/types/authuser.type";

interface ChatStore {
    messages: Array<Message>,
    users: Array<User>,
    selectedUser: User | null,
    isUsersLoading:boolean,
    isMessagesLoading:boolean,
    getUsers: () => Promise<void>,
    getMessages: (userId:string) => Promise<void>,
    sendMessage: (messageData:any) => Promise<void>,
    setSelectedUser: (selectedUser:User | null) => void,
    subscribeToMessages: () => Promise<void>,
    unsubscribeFromMessages: () => Promise<void>
}

interface Message {
    _id: string,
    senderId: string,
    receiverId: string,
    text: string,
    image: string,
    createdAt: Date,
}

export const useChatStore = create<ChatStore>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get("/messages/users");
            set({ users: response.data });
        } catch (error:AxiosError<any> | any) {
            toast.error(error.response?.data?.message || "Error fetching users");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId:string) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: response.data });
        } catch (error:AxiosError<any> | any) {
            toast.error(error.response?.data?.message || "Error fetching users");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData:any) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axiosInstance.post(`/messages/send/${ selectedUser?._id }`, messageData);
            set({ messages: [...messages, response.data] });
        } catch (error:AxiosError<any> | any) {
            toast.error(error.response?.data?.message || "Error sending message");
        }
    },

    setSelectedUser: (selectedUser:User | null) => set({ selectedUser }),

    subscribeToMessages: async () => {

    }, 

    unsubscribeFromMessages: async () => {
        
    }
}));