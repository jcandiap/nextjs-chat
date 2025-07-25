"use client";

import { useAuthStore } from '@/store/useAuthStore';
import React, { FormEventHandler, useEffect, useState } from 'react'
import { MessageSquare, User, Mail, Lock, Eye, EyeClosed, Loader } from 'lucide-react'
import Link from 'next/link';
import AuthImagePattern from '@/components/AuthImagePattern';
import toast from 'react-hot-toast';
import { AuthStore } from '@/types/authstore.type';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const router = useRouter();
    
    const { signup, isSigningUp, authUser } = useAuthStore() as AuthStore;

    const validateForm = () => {
        if( !formData.fullName.trim() ) return toast.error("Full name is required");
        if( !formData.email.trim() ) return toast.error("Email is required");
        if( !/\S+@\S+\.\S+/.test(formData.email) ) return toast.error("Invalid email format");
        if( !formData.password.trim() ) return toast.error("Password is required");
        if( formData.password.length < 6 ) return toast.error("Password must be at least 6 characters");

        return true;
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const success = validateForm();

        if( success === true ) {
            signup(formData);
        }
    }

    useEffect(() => {
        if( authUser !== null ) {
            router.push("/");
        }
    }, [authUser]);

    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            {/* Left side */}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    {/* Insert LOGO here */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                <MessageSquare className='size-6 text-primary'/>
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                            <p className='text-base-content/60'>Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={ handleSubmit } className='space-y-6'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-font font-medium'>Full Name</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <User className='size-5 text-base-content/40'/>
                                </div>
                                <input 
                                    type='text'
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='Jonh Doe'
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({...formData, fullName: e.target.value })}/>
                            </div>
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-font font-medium'>Email</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Mail className='size-5 text-base-content/40'/>
                                </div>
                                <input 
                                    type='email'
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='you@example.com'
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value })}/>
                            </div>
                        </div>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-font font-medium'>Password</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <Lock className='size-5 text-base-content/40'/>
                                </div>
                                <input 
                                    type={ showPassword ? 'text' : 'password'}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='••••••'
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value })}
                                />
                                <button 
                                    type='button' 
                                    className='absolute z-10 inset-y-0 right-0 pr-3 flex items-center'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    { showPassword ? (
                                        <Eye className='size-5 text-base-content/40'/>
                                    ) : (
                                        <EyeClosed className='size-5 text-base-content/40'/>
                                    )}
                                </button>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
                            {
                                isSigningUp ? (
                                    <>
                                        <Loader className='size-5 animate-spin'/>
                                        Loading...
                                    </>
                                ) : (
                                    "Create an account"
                                )
                            }
                        </button>
                    </form>
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Already have an account?{" "}
                            <Link href={'/login'} className='link link-primary'>Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>

            <AuthImagePattern 
                title='Join our community'
                subtitle='Connect with friends, share moments and stay in touch with you loved ones'
            />
        </div>
    )
}
