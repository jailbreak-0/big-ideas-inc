"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useCart } from '../../../../context/CartContext';
import { formatPrice, usdToGhs } from '../../../../lib/utils';

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
    stock_quantity: number;
    subcategory_id?: string;
    category?: any;
    subcategory?: any;
}

interface SubcategoryClientProps {
    categorySlug: string;
    categoryName: string;
    subcategory: {
        id: string;
        name: string;
        slug: string;
        description?: string | null;
    };
    initialProducts: Product[];
}

export default function SubcategoryClient({ 
    categorySlug, 
    categoryName,
    subcategory, 
    initialProducts 
}: SubcategoryClientProps) {
    const { addToCart } = useCart();
    
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(62500);
    const [sortBy, setSortBy] = useState<string>('popular');

    const brands = useMemo(() => {
        if (!initialProducts) return [];
        const brandSet = new Set(initialProducts.map(p => p.brand));
        return Array.from(brandSet).sort();
    }, [initialProducts]);

    const filteredProducts = useMemo(() => {
        if (!initialProducts) return [];
        let filtered = [...initialProducts];

        if (selectedBrands.length > 0) {
            filtered = filtered.filter(p => selectedBrands.includes(p.brand));
        }

        filtered = filtered.filter(p => usdToGhs(Number(p.price)) <= priceRange);

        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => Number(a.price) - Number(b.price));
                break;
            case 'price-high':
                filtered.sort((a, b) => Number(b.price) - Number(a.price));
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return filtered;
    }, [initialProducts, selectedBrands, priceRange, sortBy]);

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setPriceRange(62500);
    };

    return (
        <div className="max-w-360 mx-auto px-6 py-8">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
                <Link className="hover:text-primary uppercase tracking-wider" href="/">Home</Link>
                <span className="material-symbols-outlined text-xs!">chevron_right</span>
                <Link className="hover:text-primary uppercase tracking-wider" href="/catalog">Catalog</Link>
                <span className="material-symbols-outlined text-xs!">chevron_right</span>
                <Link className="hover:text-primary uppercase tracking-wider" href={`/catalog/${categorySlug}`}>{categoryName}</Link>
                <span className="material-symbols-outlined text-xs!">chevron_right</span>
                <span className="text-slate-900 dark:text-slate-100 uppercase tracking-wider">{subcategory.name}</span>
            </nav>

            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-extrabold tracking-tighter mb-4">{subcategory.name}</h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        {subcategory.description}
                    </p>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-lg">
                    <div className="px-3 py-1 bg-primary/10 text-primary rounded">{filteredProducts.length} Products</div>
                </div>
            </div>

            <div className="flex gap-10">
                <aside className="w-64 shrink-0 hidden lg:block">
                    <div className="sticky top-24 space-y-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Filters</h2>
                            <button onClick={clearFilters} className="text-xs font-bold text-primary hover:underline">
                                Clear all
                            </button>
                        </div>

                        <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
                            <h3 className="text-sm font-bold mb-4">Brand</h3>
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {brands.map(brand => (
                                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => toggleBrand(brand)}
                                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm group-hover:text-primary transition-colors">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
                            <h3 className="text-sm font-bold mb-4">Price Range</h3>
                            <input
                                type="range"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full accent-primary h-1.5 rounded-full"
                                min="0"
                                max="62500"
                            />
                            <div className="flex justify-between mt-3 text-xs font-bold text-slate-500">
                                <span>GH₵0</span>
                                <span>GH₵{priceRange.toLocaleString()}+</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-600 dark:text-slate-400">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="popular">Most Popular</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-500">No products found matching your filters</p>
                            <button onClick={clearFilters} className="mt-4 text-primary font-bold hover:underline">
                                Clear filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col shadow-sm hover:shadow-xl transition-all">
                                    <div className="relative aspect-square bg-slate-50 dark:bg-slate-950 overflow-hidden">
                                        <Link href={`/product/${product.slug}`}>
                                            <img 
                                                src={product.image_url || ''} 
                                                alt={product.name} 
                                                className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" 
                                            />
                                        </Link>
                                        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-primary!">favorite</span>
                                        </button>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="text-[10px] font-extrabold uppercase tracking-widest text-primary mb-1">{product.brand}</div>
                                        <Link href={`/product/${product.slug}`} className="text-lg font-bold leading-tight mb-2 hover:text-primary transition-colors">{product.name}</Link>
                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex flex-col">
                                                {product.old_price ? (
                                                    <>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl font-black tracking-tighter">{formatPrice(Number(product.price))}</span>
                                                            <span className="text-sm text-slate-400 line-through">{formatPrice(Number(product.old_price))}</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span className="text-2xl font-black tracking-tighter">{formatPrice(Number(product.price))}</span>
                                                )}
                                                <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    price: Number(product.price),
                                                    image: product.image_url || '',
                                                    brand: product.brand,
                                                    category: '',
                                                    description: product.description || '',
                                                    rating: Number(product.rating),
                                                    reviewsCount: product.reviews_count,
                                                    status: product.status as any
                                                })}
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
        </div>
    );
}
