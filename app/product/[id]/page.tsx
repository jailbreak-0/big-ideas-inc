"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';
import { formatPrice } from '../../../lib/utils';
import { useData } from '../../../hooks/useData';

const ProductDetailPage: React.FC = () => {
    const { addToCart } = useCart();
    const { id } = useParams();
    const productSlug = Array.isArray(id) ? id[0] : id;
    const { products, loading } = useData();
    const [quantity, setQuantity] = useState(1);
    
    const product = products?.find(p => p.slug === productSlug);

    if (loading) {
        return (
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">Sorry, we couldn't find the product you're looking for.</p>
                    <Link href="/catalog" className="text-primary font-bold hover:underline">
                        Browse Catalog
                    </Link>
                </div>
            </div>
        );
    }

    const getCategoryName = (category: any) => {
        if (!category) return 'Products';
        if (Array.isArray(category)) return category[0]?.name || 'Products';
        return category.name || 'Products';
    };

    return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-primary/60 dark:text-[#45a1a1] mb-8">
                <Link className="hover:text-primary" href="/">Home</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <Link className="hover:text-primary" href="/catalog">{getCategoryName(product.category)}</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-[#0c1d1d] dark:text-[#f8fcfc] font-semibold">{product.name}</span>
            </nav>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                {/* Left: Gallery */}
                <div className="lg:col-span-7 flex flex-col md:flex-row gap-6">
                    <div className="flex md:flex-col gap-4 order-2 md:order-1 overflow-x-auto md:overflow-y-visible pb-2 md:pb-0">
                        {[1, 2, 3].map(i => (
                            <div key={i} className={`size-20 min-w-20 rounded-lg border-2 ${i === 1 ? 'border-primary' : 'border-slate-200'} bg-white flex items-center justify-center cursor-pointer overflow-hidden`}>
                                <img src={product.image_url} alt="thumb" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 bg-white dark:bg-white/5 rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center relative order-1 md:order-2 group">
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-contain p-10" />
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
                                <span className="ml-2 text-sm font-semibold text-gray-500">({product.reviews_count} reviews)</span>
                            </div>
                        </div>
                        <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.1] mb-4">{product.name}</h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">{product.description}</p>
                    </div>

                    <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-[#e6f4f4] dark:border-white/10 shadow-sm">
                        <div className="flex items-end gap-3 mb-2">
                            <span className="text-4xl font-black text-primary">{formatPrice(product.price)}</span>
                            {product.old_price && <span className="text-lg text-gray-400 line-through mb-1">{formatPrice(product.old_price)}</span>}
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
                                    onClick={() => addToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: Number(product.price),
                                        image: product.image_url || '',
                                        brand: product.brand,
                                        category: getCategoryName(product.category),
                                        description: product.description || '',
                                        rating: Number(product.rating),
                                        reviewsCount: product.reviews_count,
                                        status: product.status as any
                                    })}
                                    className="flex-[3] bg-primary text-white rounded-xl font-extrabold py-4 flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                                >
                                    <span className="material-symbols-outlined">shopping_cart</span>
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specs Section */}
            {product.specs && Object.keys(product.specs).length > 0 && (
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 bg-white dark:bg-white/5 p-8 rounded-2xl border border-slate-100 dark:border-white/10">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">analytics</span>
                            Technical Specifications
                        </h3>
                        <table className="w-full text-left text-sm">
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {Object.entries(product.specs).map(([key, val]) => (
                                    <tr key={key} className="group">
                                        <td className="py-4 font-bold text-primary w-1/3">{key}</td>
                                        <td className="py-4 text-gray-600 dark:text-gray-300">{val}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetailPage;
