"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }

        if (password.length < 1) {
            setError('Please enter your password');
            return;
        }

        setLoading(true);

        try {
            const { error } = await signIn(email, password);
            if (error) {
                setError(error.message);
            } else {
                setSuccess('Login successful! Redirecting...');
                setTimeout(() => {
                    router.push('/dashboard');
                }, 1000);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-background-dark py-12">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8">
                        <div className="bg-primary p-2 rounded-lg text-white">
                            <span className="material-symbols-outlined text-3xl">waves</span>
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight dark:text-white uppercase">
                            Big Ideas <span className="text-primary">Inc.</span>
                        </h1>
                    </Link>
                    <h2 className="text-3xl font-black tracking-tight mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Sign in to access your account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white dark:bg-background-dark p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-white/10">
                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                            <span className="material-symbols-outlined text-lg">error</span>
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                            <span>{success}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-slate-900 dark:text-white"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                Password
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 border border-slate-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-slate-900 dark:text-white"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                >
                                    <span className="material-symbols-outlined text-xl">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="rounded border-slate-300 dark:border-white/10 text-primary focus:ring-primary cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                                Remember me
                            </span>
                        </label>
                        <Link href="/reset-password" className="text-sm font-semibold text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                Signing in...
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined">login</span>
                                Sign In
                            </>
                        )}
                    </button>

                    <div className="text-center">
                        <Link href="/signup" className="text-primary hover:underline text-sm font-semibold">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </form>

                <div className="text-center text-xs text-slate-500 dark:text-slate-400">
                    By continuing, you agree to our{' '}
                    <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </div>
            </div>
        </div>
    );
}
