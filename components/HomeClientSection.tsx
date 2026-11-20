"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { formatPrice, usdToGhs } from '../lib/utils';

interface Product {
    id: string;
    name: string;
    slug: string;
    brand: string;
    price: number;
    old_price?: number | null;
    description?: string | null;
    image_url?: string | null;
    rating: number;
    reviews_count: number;
    status: string;
    category?: { name: string; slug: string } | { name: string; slug: string }[] | null;
    subcategory?: { name: string; slug: string } | { name: string; slug: string }[] | null;
}

interface HomeClientSectionProps {
    featuredProducts: Product[];
}

export default function HomeClientSection({ featuredProducts }: HomeClientSectionProps) {
    const { addToCart } = useCart();

    const getCategoryName = (category: any) => {
        if (!category) return '';
        if (Array.isArray(category)) return category[0]?.name || '';
        return category.name || '';
    };

    if (!featuredProducts || featuredProducts.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts[0] && featuredProducts[0].old_price && (
                <div className="sm:col-span-2 lg:row-span-2 bg-white dark:bg-background-dark p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-charcoal/10 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded">
                                SAVE GH₵{usdToGhs(featuredProducts[0].old_price - featuredProducts[0].price).toFixed(0)}
                            </span>
                            <span className="material-symbols-outlined text-charcoal/20">favorite</span>
                        </div>
                        <Link href={`/product/${featuredProducts[0].slug}`} className="block">
                            <div className="aspect-video mb-4 sm:mb-6 overflow-hidden rounded-xl">
                                <img
                                    src={featuredProducts[0].image_url || ''}
                                    alt={featuredProducts[0].name}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </Link>
                        <Link href={`/product/${featuredProducts[0].slug}`}>
                            <h3 className="text-xl sm:text-2xl font-bold mb-2 hover:text-primary transition-colors">{featuredProducts[0].name}</h3>
                        </Link>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 sm:mb-6">{featuredProducts[0].description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-slate-600 line-through text-sm dark:text-slate-400">{formatPrice(featuredProducts[0].old_price)}</span>
                            <div className="text-2xl sm:text-3xl font-black text-primary">{formatPrice(featuredProducts[0].price)}</div>
                        </div>
                        <button
                            onClick={() => addToCart({
                                id: featuredProducts[0].id,
                                name: featuredProducts[0].name,
                                price: Number(featuredProducts[0].price),
                                image: featuredProducts[0].image_url || '',
                                brand: featuredProducts[0].brand,
                                category: getCategoryName(featuredProducts[0].category),
                                description: featuredProducts[0].description || '',
                                rating: Number(featuredProducts[0].rating),
                                reviewsCount: featuredProducts[0].reviews_count,
                                status: featuredProducts[0].status as any
                            })}
                            className="bg-primary h-12 w-12 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-primary/20"
                        >
                            <span className="material-symbols-outlined">add_shopping_cart</span>
                        </button>
                    </div>
                </div>
            )}

            {featuredProducts.slice(1, 3).map(product => (
                <div key={product.id} className="bg-white dark:bg-background-dark p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-charcoal/10 flex flex-col group shadow-sm hover:shadow-xl transition-all">
                    <Link href={`/product/${product.slug}`} className="block">
                        <div className="aspect-square mb-3 sm:mb-4 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900">
                            <img src={product.image_url || ''} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </Link>
                    <Link href={`/product/${product.slug}`}>
                        <h4 className="font-bold text-sm line-clamp-1 hover:text-primary transition-colors">{product.name}</h4>
                    </Link>
                    <span className="text-slate-600 text-xs mb-3 dark:text-slate-400">{product.brand}</span>
                    <div className="mt-auto flex justify-between items-center">
                        <span className="font-black text-lg text-primary">{formatPrice(product.price)}</span>
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
                            className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                        >
                            <span className="material-symbols-outlined">add_shopping_cart</span>
                        </button>
                    </div>
                </div>
            ))}

            <div className="sm:col-span-2 bg-primary/10 dark:bg-primary/5 border border-primary/20 p-6 sm:p-8 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative overflow-hidden">
                <div className="relative z-10 text-center sm:text-left">
                    <span className="text-primary font-black text-[10px] uppercase tracking-widest mb-2 block">Exclusive Bundle</span>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Focusrite Scarlett 2i2 <br />Studio Starter Pack</h3>
                    <button className="text-primary font-bold text-sm border-b-2 border-primary">Grab the Bundle</button>
                </div>
                <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-primary/20 blur-3xl rounded-full"></div>
                <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcAyNkMq7p0siCZ6UzURRJdNanRhAsy6y8MyRxHK2Y2vpehaPtXh6JgkvOjlMi4rl8ZDkcGjRzSGeDMPljzx77Q8q7SYE0hlPq9-Q_z84gF6ybx06C9ThxF3wrke5-lhRSXIw70DslEDJ0sod3z2TE97MecejPKStOSUvFguR9kDPWF1pZiu3ZixRKFAbN5U06DFNl8xeS5HwwEnC-y44LKYo2ojwBJWxjiD-0VZ21jl6by2NzZLcgil3dyC26XjbduBXkuRKjh3P" alt="Bundle" className="w-full h-full object-contain" />
                </div>
            </div>
        </div>
    );
}
