"use client";

import { useAuthStore } from "@/store/useAuthStore";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore() as {
        authUser: any;
        checkAuth: () => void;
        isCheckingAuth: boolean;
    };
    const router = useRouter();
    const pathname = usePathname();

    const publicRoutes = ["/login", "/signin"];

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (!isCheckingAuth) {
            const isPublicRoute = publicRoutes.includes(pathname);

            if (!authUser && !isPublicRoute) {
                // Usuario NO autenticado intentando acceder a ruta privada
                router.replace("/signin");
            }

            if (authUser && isPublicRoute) {
                // Usuario autenticado intentando acceder a ruta pública
                router.replace("/");
            }
        }
    }, [isCheckingAuth, authUser, pathname]);

    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
};
