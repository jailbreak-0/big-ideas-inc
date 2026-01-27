"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import { MOCK_ORDERS } from '../../constants';

const DashboardPage: React.FC = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <span className="material-symbols-outlined text-6xl text-primary animate-spin">progress_activity</span>
                    <p className="text-slate-600 dark:text-slate-400">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto p-8 flex gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-64 shrink-0 hidden lg:flex flex-col gap-8">
                <nav className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="font-bold text-sm">Dashboard</span>
                    </div>
                    <Link href="/dashboard/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group cursor-pointer">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">receipt_long</span>
                        <span className="font-medium text-sm">Order History</span>
                    </Link>
                    <Link href="/dashboard/wishlist" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group cursor-pointer">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">favorite</span>
                        <span className="font-medium text-sm">Wishlist</span>
                    </Link>
                    <Link href="/dashboard/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group cursor-pointer">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">settings</span>
                        <span className="font-medium text-sm">Settings</span>
                    </Link>
                </nav>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold truncate">{user.email}</p>
                            <p className="text-xs text-slate-500">Member</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-3 leading-tight">Enjoy exclusive member benefits and discounts.</p>
                </div>
            </aside>

            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold tracking-tight">Welcome back, {user.user_metadata?.display_name || user.email?.split('@')[0]}</h1>
                    <p className="text-gray-500">You have {MOCK_ORDERS.length} items arriving this week. Keep shredding!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
                            <p className="text-3xl font-extrabold text-primary">{MOCK_ORDERS.length}</p>
                        </div>
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined">receipt_long</span>
                        </div>
                    </div>
                    {/* <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Active Warranties</p>
                            <p className="text-3xl font-extrabold">{MOCK_ORDERS.length}</p>
                        </div>
                        <div className="size-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                            <span className="material-symbols-outlined">verified</span>
                        </div>
                    </div> */}
                    {/* <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Gear Points</p>
                            <p className="text-3xl font-extrabold">{MOCK_ORDERS.length * 10}</p>
                        </div>
                        <div className="size-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                            <span className="material-symbols-outlined">stars</span>
                        </div>
                    </div> */}
                </div>

                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">Recent Orders</h3>
                        <button className="text-sm font-bold text-primary">View All</button>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 border-b text-gray-500">
                                    <th className="px-6 py-4 text-xs font-bold uppercase">Order</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase">Product</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase">Status</th>
                                    {/* <th className="px-6 py-4 text-xs font-bold uppercase text-right">Action</th> */}
                                </tr>
                            </thead>
                            <tbody className="divide-y text-primary">
                                {MOCK_ORDERS.map(order => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold">{order.id}</span>
                                            <p className="text-[11px] text-gray-500">{order.date}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="size-10 rounded-lg bg-slate-50 border overflow-hidden">
                                                    <img src={order.productImage} className="w-full h-full object-contain" />
                                                </div>
                                                <span className="text-sm font-medium">{order.productName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${order.status === 'Shipped' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-700'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        {/* <td className="px-6 py-4 text-right">
                                            <button className="text-sm font-bold text-primary hover:underline">{order.status === 'Shipped' ? 'Track' : 'Review'}</button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DashboardPage;
