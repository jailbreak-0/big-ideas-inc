"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.updateUser({ password });

            if (error) {
                setError(error.message);
            } else {
                setSuccess(true);
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            }
        } catch (err) {
            setError('An unexpected error occurred');
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
                        Update Your Password
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Enter your new password below
                    </p>
                </div>

                {success ? (
                    <div className="bg-white dark:bg-background-dark p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-white/10 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                            <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400">check_circle</span>
                        </div>
                        <h3 className="text-xl font-bold">Password Updated!</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Your password has been successfully updated. Redirecting you to your dashboard...
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleUpdate} className="space-y-6 bg-white dark:bg-background-dark p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-white/10">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                                <span className="material-symbols-outlined text-lg">error</span>
                                <span>{error}</span>
                            </div>
                        )}

                        <div>
                            <label htmlFor="password" className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                New Password
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-slate-900 dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                Must be at least 6 characters
                            </p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-slate-300 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-background-dark text-slate-900 dark:text-white"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">save</span>
                                    Update Password
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
