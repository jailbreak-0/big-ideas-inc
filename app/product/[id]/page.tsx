"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Product } from '../../../types';
import { MOCK_PRODUCTS } from '../../../constants';
import { useCart } from '../../../context/CartContext';
import { formatPrice } from '../../../lib/utils';

const ProductDetailPage: React.FC = () => {
    const { addToCart } = useCart();
    const { id } = useParams();
    const productId = Array.isArray(id) ? id[0] : id; // Handle potential array from Next.js dynamic routes
    const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[4];
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-primary/60 dark:text-[#45a1a1] mb-8">
                <Link className="hover:text-primary" href="/">Home</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <Link className="hover:text-primary" href="/catalog">Keyboards</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-[#0c1d1d] dark:text-[#f8fcfc] font-semibold">{product.name}</span>
            </nav>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                {/* Left: Gallery */}
                <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
                    <div className="flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:overflow-y-visible pb-2 md:pb-0">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`size-20 min-w-20 rounded-lg border-2 ${i === 1 ? 'border-primary' : 'border-slate-200'} bg-white flex items-center justify-center cursor-pointer overflow-hidden`}>
                                <img src={product.image} alt="thumb" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 bg-white dark:bg-white/5 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative order-1 md:order-2 group">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-10" />
                        <button className="absolute top-4 right-4 bg-white/80 dark:bg-black/40 backdrop-blur p-3 rounded-full hover:bg-white transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-primary">zoom_in</span>
                        </button>
                    </div>
                </div>

                {/* Right: Purchase UI */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 bg-amber-500/10 text-amber-600 text-xs font-bold uppercase tracking-widest rounded">Premium Selection</span>
                            <div className="flex items-center gap-1 text-primary">
                                {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-symbols-outlined text-sm">star</span>)}
                                <span className="ml-2 text-sm font-semibold text-gray-500">({product.reviewsCount} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.1] mb-4">{product.name}</h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">{product.description}</p>
                    </div>

                    <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-[#e6f4f4] dark:border-white/10 shadow-sm">
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-4xl font-black text-primary">{formatPrice(product.price)}</span>
                            {product.oldPrice && <span className="text-lg text-gray-400 line-through mb-1">{formatPrice(product.oldPrice)}</span>}
                        </div>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-bold mb-6">
                            <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            {product.status} & Ready to Ship
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <div className="flex-1 flex items-center justify-between border-2 border-slate-100 dark:border-white/10 rounded-xl px-4 py-2">
                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-primary hover:bg-primary/10 rounded p-1"><span className="material-symbols-outlined">remove</span></button>
                                    <span className="font-bold">{quantity}</span>
                                    <button onClick={() => setQuantity(q => q + 1)} className="text-primary hover:bg-primary/10 rounded p-1"><span className="material-symbols-outlined">add</span></button>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="flex-[3] bg-primary text-white rounded-xl font-extrabold py-4 flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    ADD TO CART
                                </button>
                            </div>
                            {/* <button className="w-full bg-[#e6f4f4] dark:bg-white/10 text-primary font-bold py-4 rounded-xl hover:bg-primary/10 transition-colors">
                                FINANCING FROM $92/MO
                            </button> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Specs Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 bg-white dark:bg-white/5 p-8 rounded-2xl border border-slate-100 dark:border-white/10">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">analytics</span>
                        Technical Specifications
                    </h3>
                    <table className="w-full text-left text-sm">
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {Object.entries(product.specs || {}).map(([key, val]) => (
                                <tr key={key} className="group">
                                    <td className="py-4 font-bold text-primary w-1/3">{key}</td>
                                    <td className="py-4 text-gray-600 dark:text-gray-300">{val}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="lg:col-span-4 bg-primary/5 rounded-2xl p-8 border border-primary/20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-2">Interactive Preview</h3>
                        <p className="text-sm text-gray-500 mb-6">Inspect every angle and hear the resonance of our signature samples.</p>
                        <div className="space-y-4">
                            <button className="w-full bg-white dark:bg-background-dark border-2 border-primary/20 hover:border-primary py-4 rounded-xl flex items-center justify-center gap-3 transition-all">
                                <span className="material-symbols-outlined text-primary">360</span>
                                <span className="font-bold">Enter 360° Studio</span>
                            </button>
                            <div className="p-4 bg-white dark:bg-background-dark rounded-xl shadow-sm">
                                <div className="flex items-center gap-4">
                                    <button className="size-10 bg-primary text-white rounded-full flex items-center justify-center"><span className="material-symbols-outlined">play_arrow</span></button>
                                    <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="w-1/3 h-full bg-primary"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </section>
        </div>
    );
};

export default ProductDetailPage;
