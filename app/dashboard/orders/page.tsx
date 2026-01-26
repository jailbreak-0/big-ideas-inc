"use client";

import React from 'react';
import Link from 'next/link';
import { MOCK_ORDERS } from '../../../constants';

const OrderHistoryPage: React.FC = () => {
    return (
        <div className="max-w-[1440px] mx-auto p-8 flex gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-8">
                <nav className="space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group cursor-pointer">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">dashboard</span>
                        <span className="font-medium text-sm">Dashboard</span>
                    </Link>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined">receipt_long</span>
                        <span className="font-bold text-sm">Order History</span>
                    </div>
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
                    <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Pro Member</p>
                    <p className="text-[11px] text-slate-500 mb-3 leading-tight">Enjoy free shipping & exclusive repair discounts.</p>
                    <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg">Upgrade</button>
                </div>
            </aside>

            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2">Order History</h1>
                    <p className="text-gray-500">View and track all your orders</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b">
                                <th className="px-6 py-4 text-xs font-bold uppercase">Order ID</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase">Product</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase">Date</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase">Total</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {MOCK_ORDERS.map(order => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-primary">{order.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-12 rounded-lg bg-slate-50 border overflow-hidden">
                                                <img src={order.productImage} alt={order.productName} className="w-full h-full object-contain" />
                                            </div>
                                            <span className="text-sm font-medium">{order.productName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600">{order.date}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold">${order.total.toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderHistoryPage;
