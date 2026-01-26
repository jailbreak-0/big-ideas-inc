"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '../../../constants';
import { useCart } from '../../../context/CartContext';

const WishlistPage: React.FC = () => {
    const { addToCart } = useCart();
    const [wishlistItems, setWishlistItems] = useState(MOCK_PRODUCTS.slice(0, 3));

    const removeFromWishlist = (id: string) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
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
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined">favorite</span>
                        <span className="font-bold text-sm">Wishlist</span>
                    </div>
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
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2">My Wishlist</h1>
                    <p className="text-gray-500">{wishlistItems.length} items saved for later</p>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                        <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">favorite_border</span>
                        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
                        <Link href="/catalog" className="bg-primary text-white px-8 py-3 rounded-xl font-bold inline-block">Browse Products</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {wishlistItems.map(product => (
                            <div key={product.id} className="group bg-white rounded-xl overflow-hidden border border-slate-100 flex flex-col shadow-sm hover:shadow-xl transition-all">
                                <div className="relative aspect-square bg-slate-50 overflow-hidden">
                                    <Link href={`/product/${product.id}`}>
                                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" />
                                    </Link>
                                    <button
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-red-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-red-500">delete</span>
                                    </button>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-[10px] font-extrabold uppercase tracking-widest text-primary mb-1">{product.brand}</div>
                                    <Link href={`/product/${product.id}`} className="text-lg font-bold leading-tight mb-2 hover:text-primary transition-colors">{product.name}</Link>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black tracking-tighter">${product.price}</span>
                                            <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {product.status}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="bg-primary text-white p-3 rounded-lg hover:bg-primary/90 transition-all"
                                        >
                                            <span className="material-symbols-outlined">shopping_cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
