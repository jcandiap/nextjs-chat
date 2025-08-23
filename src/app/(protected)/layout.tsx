"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useStoreTheme } from "@/store/useStoreTheme";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {

  const { theme } = useStoreTheme();

  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const router = useRouter();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      router.push("/signup"); // Redirige si no está autenticado
    }
  }, [isCheckingAuth, authUser, router]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={ theme }>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
