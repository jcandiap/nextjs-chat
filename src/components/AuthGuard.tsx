"use client"

import { useAuthStore } from '@/store/useAuthStore'
import React, { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore() as {
    authUser: any
    checkAuth: () => void
    isCheckingAuth: boolean
  }
  const router = useRouter()
  const navigation = usePathname();

  const publicRoutes = [
    '/login',
    '/signin'
  ]

  const privateRoutes = [
    '/',
    '/settings',
    '/profile'
  ]

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (!isCheckingAuth && !authUser && !publicRoutes.includes(navigation)) {
      router.push('/signin')
    }
  }, [isCheckingAuth, authUser, router])

  if (isCheckingAuth || (!authUser && isCheckingAuth)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
