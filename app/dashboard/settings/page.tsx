"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { createClient } from '../../../lib/supabase/client';

export default function SettingsPageNew() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
        if (user) {
            setEmail(user.email || '');
            setUsername(user.user_metadata?.display_name || '');
        }
    }, [user, authLoading, router]);

    const handleUpdateUsername = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.updateUser({
                data: { display_name: username }
            });
            
            if (error) {
                setMessage({ type: 'error', text: error.message });
            } else {
                setMessage({ type: 'success', text: 'Username updated successfully' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An unexpected error occurred' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.updateUser({ email });
            
            if (error) {
                setMessage({ type: 'error', text: error.message });
            } else {
                setMessage({ type: 'success', text: 'Check your new email to confirm the change' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An unexpected error occurred' });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        setLoading(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            
            if (error) {
                setMessage({ type: 'error', text: error.message });
            } else {
                setMessage({ type: 'success', text: 'Password updated successfully' });
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'An unexpected error occurred' });
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <span className="material-symbols-outlined text-6xl text-primary animate-spin">progress_activity</span>
                    <p className="text-slate-600 dark:text-slate-400">Loading settings...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto p-8 flex gap-8">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-8">
                <nav className="space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">dashboard</span>
                        <span className="font-medium text-sm">Dashboard</span>
                    </Link>
                    <Link href="/dashboard/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">receipt_long</span>
                        <span className="font-medium text-sm">Order History</span>
                    </Link>
                    <Link href="/dashboard/wishlist" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">favorite</span>
                        <span className="font-medium text-sm">Wishlist</span>
                    </Link>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="font-bold text-sm">Settings</span>
                    </div>
                </nav>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {(user.user_metadata?.display_name || user.email)?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">{user.user_metadata?.display_name || user.email?.split('@')[0]}</p>
                            <p className="text-xs text-slate-500">Member</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2">Account Settings</h1>
                    <p className="text-gray-500">Manage your account security and preferences</p>
                </div>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg flex items-start gap-2 ${
                        message.type === 'success' 
                            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200' 
                            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                    }`}>
                        <span className="material-symbols-outlined text-lg">
                            {message.type === 'success' ? 'check_circle' : 'error'}
                        </span>
                        <span className="text-sm">{message.text}</span>
                    </div>
                )}

                {/* Update Username */}
                <div className="bg-white dark:bg-background-dark rounded-2xl border border-slate-200 dark:border-white/10 p-8 shadow-sm mb-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">badge</span>
                        Username
                    </h2>
                    <form onSubmit={handleUpdateUsername} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Display Name</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 dark:border-white/10 p-3 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                                placeholder="Enter your username"
                                required
                            />
                            <p className="mt-1 text-xs text-slate-500">This is how other users will see you</p>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || username === user?.user_metadata?.display_name}
                            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating...' : 'Update Username'}
                        </button>
                    </form>
                </div>

                {/* Update Email */}
                <div className="bg-white dark:bg-background-dark rounded-2xl border border-slate-200 dark:border-white/10 p-8 shadow-sm mb-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">mail</span>
                        Email Address
                    </h2>
                    <form onSubmit={handleUpdateEmail} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 dark:border-white/10 p-3 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                                required
                            />
                            <p className="mt-1 text-xs text-slate-500">You'll need to verify your new email address</p>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || email === user.email}
                            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating...' : 'Update Email'}
                        </button>
                    </form>
                </div>

                {/* Update Password */}
                <div className="bg-white dark:bg-background-dark rounded-2xl border border-slate-200 dark:border-white/10 p-8 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">lock</span>
                        Change Password
                    </h2>
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 dark:border-white/10 p-3 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                                placeholder="••••••••"
                                required
                            />
                            <p className="mt-1 text-xs text-slate-500">Must be at least 6 characters</p>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 dark:border-white/10 p-3 bg-slate-50 dark:bg-background-dark text-slate-900 dark:text-white focus:ring-2 focus:ring-primary"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
