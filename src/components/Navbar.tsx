"use client";

import { useAuthStore } from '@/store/useAuthStore'
import { LogOut, Menu, MessageSquare, Settings, User } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type AuthStore = {
  logout: () => void;
  authUser: any;
};

const Navbar = () => {
    const { logout, authUser } = useAuthStore() as AuthStore;

    const handleBlurDropdownElement = () => { 
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };

    return (
      <header className='border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
        <div className='container mx-auto px-4 h-16'>
          <div className='flex items-center justify-between h-full'>
            <div className='flex items-center gap-8'>
              <Link href={ "/" } className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
                <div className='w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                  <MessageSquare className='w-5 h-5 text-center'/>
                </div>
                <h1 className='text-lg font-bold'>Chatty</h1>
              </Link>
            </div>
            <div className='flex items-center gap-2'>
              <Link href={ "/settings" } className='btn btn-ghost tooltip tooltip-bottom' data-tip="Settings">
                <Settings className='w-4 h-4'/>
              </Link>
              { authUser && (
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost m-1 tooltip tooltip-bottom" data-tip="User">
                    <Menu className='size-5'/>
                  </div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-1 shadow-sm">
                    <li>
                      <Link href={ "/profile" } className='btn btn-ghost' onClick={handleBlurDropdownElement}>
                        <User className='size-5'/>
                        <span className="inline">Profile</span>
                      </Link>
                    </li>
                    <li>
                      <button type='button' className='btn btn-ghost' onClick={() => { logout(); handleBlurDropdownElement() }}>
                        <LogOut className='size-5'/>
                        <span className="inline">Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    )
}

export default Navbar;