// app/(protected)/layout.tsx
"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore() as {
      authUser: any
      checkAuth: () => void
      isCheckingAuth: boolean
    }
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth && !authUser) {
      router.replace("/signin");
    }
  }, [isCheckingAuth, authUser, router]);

  if (isCheckingAuth || (!authUser && !isCheckingAuth)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
