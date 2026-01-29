"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/hooks/useData';

interface Product {
    id: string;
    name: string;
    slug: string;
    brand: string;
    price: number;
    old_price?: number;
    image_url?: string;
    category_id?: string;
    subcategory_id?: string;
    rating?: number;
    reviews_count?: number;
    status?: string;
}

const SearchPageContent: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const query = searchParams.get('q') || '';
    const [searchQuery, setSearchQuery] = useState(query);
    const [sortBy, setSortBy] = useState('relevance');
    const { products, categories, loading } = useData();

    useEffect(() => {
        setSearchQuery(query);
    }, [query]);

    // Filter products based on search query
    const searchResults = useMemo(() => {
        if (!query || !products) return [];

        const lowerQuery = query.toLowerCase();
        const filtered = products.filter(product => {
            const matchesName = product.name.toLowerCase().includes(lowerQuery);
            const matchesBrand = product.brand.toLowerCase().includes(lowerQuery);
            const matchesDescription = product.description?.toLowerCase().includes(lowerQuery);
            
            return matchesName || matchesBrand || matchesDescription;
        });

        // Sort results
        if (sortBy === 'price-low') {
            return filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            return filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name') {
            return filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        return filtered; // relevance (default order)
    }, [query, products, sortBy]);

    // Get category name for a product
    const getCategoryName = (categoryId?: string) => {
        if (!categoryId || !categories) return null;
        return categories.find(cat => cat.id === categoryId)?.name;
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-background-dark">
            {/* Search Header */}
            <div className="bg-slate-50 dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
                    <h1 className="text-3xl font-bold text-charcoal dark:text-white mb-6">Search Results</h1>
                    
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="max-w-3xl">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                search
                            </span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search instruments, studio gear, brands..."
                                className="w-full bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 rounded-xl py-4 pl-12 pr-4 text-charcoal dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </form>
                </div>
            </div>

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
                {/* Results Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        {loading ? (
                            <p className="text-slate-600 dark:text-slate-400">Searching...</p>
                        ) : (
                            <p className="text-slate-600 dark:text-slate-400">
                                {searchResults.length > 0 ? (
                                    <>
                                        Found <span className="font-bold text-charcoal dark:text-white">{searchResults.length}</span> {searchResults.length === 1 ? 'result' : 'results'} for <span className="font-bold text-charcoal dark:text-white">"{query}"</span>
                                    </>
                                ) : query ? (
                                    <>No results found for <span className="font-bold text-charcoal dark:text-white">"{query}"</span></>
                                ) : (
                                    'Enter a search query'
                                )}
                            </p>
                        )}
                    </div>

                    {/* Sort Options */}
                    {searchResults.length > 0 && (
                        <div className="flex items-center gap-3">
                            <label className="text-sm text-slate-600 dark:text-slate-400">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 rounded-lg px-4 py-2 text-sm text-charcoal dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="relevance">Relevance</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-slate-200 dark:bg-white/10 aspect-square rounded-xl mb-4"></div>
                                <div className="h-4 bg-slate-200 dark:bg-white/10 rounded mb-2"></div>
                                <div className="h-3 bg-slate-200 dark:bg-white/10 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {searchResults.map((product) => {
                            const discount = product.old_price ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : 0;
                            const categoryName = getCategoryName('category_id' in product ? product.category_id : undefined);

                            return (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.slug}`}
                                    className="group relative bg-white dark:bg-white/5 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                                >
                                    {/* Discount Badge */}
                                    {discount > 0 && (
                                        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                            -{discount}%
                                        </div>
                                    )}

                                    {/* Product Image */}
                                    <div className="relative aspect-square bg-slate-50 dark:bg-white/5 overflow-hidden">
                                        <img
                                            src={product.image_url || ''}
                                            alt={product.name}
                                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4 space-y-2">
                                        {/* Category */}
                                        {categoryName && (
                                            <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                                                {categoryName}
                                            </p>
                                        )}

                                        {/* Brand */}
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">
                                            {product.brand}
                                        </p>

                                        {/* Product Name */}
                                        <h3 className="text-sm font-bold text-charcoal dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>

                                        {/* Rating */}
                                        {product.rating && product.reviews_count ? (
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center">
                                                    {[...Array(5)].map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`material-symbols-outlined text-sm ${
                                                                i < Math.floor(product.rating || 0)
                                                                    ? 'text-yellow-400'
                                                                    : 'text-slate-300 dark:text-slate-600'
                                                            }`}
                                                        >
                                                            star
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                                    ({product.reviews_count})
                                                </span>
                                            </div>
                                        ) : null}

                                        {/* Price */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-charcoal dark:text-white">
                                                ${product.price.toLocaleString()}
                                            </span>
                                            {product.old_price && (
                                                <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                                                    ${product.old_price.toLocaleString()}
                                                </span>
                                            )}
                                        </div>

                                        {/* Stock Status */}
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`text-xs font-semibold ${
                                                    product.status === 'In Stock'
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-red-600 dark:text-red-400'
                                                }`}
                                            >
                                                {product.status || 'In Stock'}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : query ? (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-7xl text-slate-300 dark:text-slate-700 mb-4">
                            search_off
                        </span>
                        <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-2">
                            No Results Found
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8">
                            We couldn't find any products matching "{query}"
                        </p>
                        <div className="space-y-4">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Try:</p>
                            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                <li>• Checking your spelling</li>
                                <li>• Using different keywords</li>
                                <li>• Searching for more general terms</li>
                                <li>• Browsing our categories instead</li>
                            </ul>
                        </div>
                        <Link
                            href="/catalog"
                            className="inline-flex items-center gap-2 mt-8 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all"
                        >
                            Browse All Products
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <span className="material-symbols-outlined text-7xl text-slate-300 dark:text-slate-700 mb-4">
                            search
                        </span>
                        <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-2">
                            Start Your Search
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Enter a search term to find products
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const SearchPage: React.FC = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white dark:bg-background-dark flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400">Loading search...</p>
                </div>
            </div>
        }>
            <SearchPageContent />
        </Suspense>
    );
};

export default SearchPage;
