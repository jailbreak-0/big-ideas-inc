"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../lib/supabase/client';

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`,
            });

            if (error) {
                setError(error.message);
            } else {
                setSuccess(true);
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
                        Reset Your Password
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                {success ? (
                    <div className="bg-white dark:bg-background-dark p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-white/10 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                            <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400">mark_email_read</span>
                        </div>
                        <h3 className="text-xl font-bold">Check Your Email</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            We've sent a password reset link to <strong>{email}</strong>
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Click the link in the email to reset your password.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-lg transition-all"
                        >
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleReset} className="space-y-6 bg-white dark:bg-background-dark p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-white/10">
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                                <span className="material-symbols-outlined text-lg">error</span>
                                <span>{error}</span>
                            </div>
                        )}

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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">forward_to_inbox</span>
                                    Send Reset Link
                                </>
                            )}
                        </button>

                        <div className="text-center">
                            <Link href="/login" className="text-sm text-primary hover:underline font-semibold">
                                ← Back to Login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
