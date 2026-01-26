"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const SettingsPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Music Lane',
        city: 'Nashville',
        state: 'TN',
        zip: '37201',
        notifications: true,
        newsletter: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        alert('Settings saved successfully!');
    };

    return (
        <div className="max-w-[1440px] mx-auto p-8 flex gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-64 flex-shrink-0 hidden lg:flex flex-col gap-8">
                <nav className="space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group cursor-pointer">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">dashboard</span>
                        <span className="font-medium text-sm">Dashboard</span>
                    </Link>
                    <Link href="/dashboard/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group cursor-pointer">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">receipt_long</span>
                        <span className="font-medium text-sm">Order History</span>
                    </Link>
                    <Link href="/dashboard/wishlist" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 transition-colors group cursor-pointer">
                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">favorite</span>
                        <span className="font-medium text-sm">Wishlist</span>
                    </Link>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined">settings</span>
                        <span className="font-bold text-sm">Settings</span>
                    </div>
                </nav>
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Pro Member</p>
                    <p className="text-[11px] text-slate-500 mb-3 leading-tight">Enjoy free shipping & exclusive repair discounts.</p>
                    <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg">Upgrade</button>
                </div>
            </aside>

            <div className="flex-1 max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2">Account Settings</h1>
                    <p className="text-gray-500">Manage your account information and preferences</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">person</span>
                            Personal Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Full Name</label>
                                <input
                                    type="text"
                                    placeholder={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-lg border-slate-200 p-3 bg-slate-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full rounded-lg border-slate-200 p-3 bg-slate-50"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full rounded-lg border-slate-200 p-3 bg-slate-50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">location_on</span>
                            Shipping Address
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2">Street Address</label>
                                <input
                                    type="text"
                                    placeholder={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full rounded-lg border-slate-200 p-3 bg-slate-50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">City</label>
                                <input
                                    type="text"
                                    placeholder={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    className="w-full rounded-lg border-slate-200 p-3 bg-slate-50"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">State</label>
                                    <input
                                        type="text"
                                        placeholder={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full rounded-lg border-slate-200 p-3 bg-slate-50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">ZIP Code</label>
                                    <input
                                        type="text"
                                        placeholder={formData.zip}
                                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                        className="w-full rounded-lg border-slate-200 p-3 bg-slate-50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">tune</span>
                            Preferences
                        </h2>
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.notifications}
                                    onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20"
                                />
                                <div>
                                    <p className="font-semibold">Order Notifications</p>
                                    <p className="text-sm text-gray-500">Receive updates about your orders</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.newsletter}
                                    onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                                    className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20"
                                />
                                <div>
                                    <p className="font-semibold">Newsletter</p>
                                    <p className="text-sm text-gray-500">Get exclusive deals and new product announcements</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                            Save Changes
                        </button>
                        <button type="button" className="bg-slate-100 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
