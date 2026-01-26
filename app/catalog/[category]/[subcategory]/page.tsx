"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MOCK_PRODUCTS } from '../../../../constants';
import { useCart } from '../../../../context/CartContext';

const subcategoryInfo: Record<string, { name: string; description: string; category: string }> = {
    'electric-guitars': { name: 'Electric Guitars', description: 'Solid body, semi-hollow, and hollow body electric guitars', category: 'guitars-bass' },
    'acoustic-guitars': { name: 'Acoustic Guitars', description: 'Steel-string and classical acoustic guitars', category: 'guitars-bass' },
    'bass-guitars': { name: 'Bass Guitars', description: '4-string, 5-string, and 6-string bass guitars', category: 'guitars-bass' },
    'analog-synths': { name: 'Analog Synths', description: 'Classic analog synthesizers with warm, organic sound', category: 'synthesizers' },
    'digital-synths': { name: 'Digital Synths', description: 'Modern digital synthesizers and workstations', category: 'synthesizers' },
    'modular-synths': { name: 'Modular Synths', description: 'Eurorack and modular synthesis systems', category: 'synthesizers' },
    'studio-monitors': { name: 'Studio Monitors', description: 'Active and passive studio monitor speakers', category: 'studio-recording' },
    'audio-interfaces': { name: 'Audio Interfaces', description: 'USB, Thunderbolt, and PCIe audio interfaces', category: 'studio-recording' },
    'outboard-gear': { name: 'Outboard Gear', description: 'Compressors, EQs, and signal processors', category: 'studio-recording' },
    'acoustic-drums': { name: 'Acoustic Drums', description: 'Complete drum kits and individual drums', category: 'drums-percussion' },
    'electronic-drums': { name: 'Electronic Drums', description: 'Digital drum kits and pads', category: 'drums-percussion' },
    'percussion': { name: 'Percussion', description: 'Hand percussion and auxiliary instruments', category: 'drums-percussion' },
    'digital-pianos': { name: 'Digital Pianos', description: 'Weighted key digital pianos', category: 'keys-pianos' },
    'stage-keyboards': { name: 'Stage Keyboards', description: 'Portable keyboards for live performance', category: 'keys-pianos' },
    'midi-controllers': { name: 'MIDI Controllers', description: 'USB MIDI keyboards and pad controllers', category: 'keys-pianos' },
    'dj-controllers': { name: 'DJ Controllers', description: 'Digital DJ controllers and turntables', category: 'dj-production' },
    'dj-mixers': { name: 'DJ Mixers', description: 'Professional DJ mixers and battle mixers', category: 'dj-production' },
    'production-gear': { name: 'Production Gear', description: 'Samplers, grooveboxes, and sequencers', category: 'dj-production' },
    'guitar-amps': { name: 'Guitar Amps', description: 'Tube, solid-state, and modeling guitar amplifiers', category: 'amplifiers' },
    'bass-amps': { name: 'Bass Amps', description: 'Bass amplifier heads and combos', category: 'amplifiers' },
    'pa-systems': { name: 'PA Systems', description: 'Powered speakers and PA systems', category: 'amplifiers' },
    'cables-connectors': { name: 'Cables & Connectors', description: 'Instrument cables, patch cables, and adapters', category: 'accessories' },
    'stands-mounts': { name: 'Stands & Mounts', description: 'Mic stands, guitar stands, and keyboard stands', category: 'accessories' },
    'cases-bags': { name: 'Cases & Bags', description: 'Gig bags, hard cases, and rack cases', category: 'accessories' }
};

const categoryNames: Record<string, string> = {
    'guitars-bass': 'Guitars & Bass',
    'synthesizers': 'Synthesizers',
    'studio-recording': 'Studio & Recording',
    'drums-percussion': 'Drums & Percussion',
    'keys-pianos': 'Keys & Pianos',
    'dj-production': 'DJ & Production',
    'amplifiers': 'Amplifiers',
    'accessories': 'Accessories'
};

const SubcategoryPage: React.FC = () => {
    const { addToCart } = useCart();
    const params = useParams();
    const categorySlug = Array.isArray(params.category) ? params.category[0] : params.category;
    const subcategorySlug = Array.isArray(params.subcategory) ? params.subcategory[0] : params.subcategory;

    const subcategory = subcategoryInfo[subcategorySlug];
    const categoryName = categoryNames[categorySlug] || 'Category';

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number>(5000);
    const [sortBy, setSortBy] = useState<string>('popular');

    // Get all unique brands from products
    const brands = useMemo(() => {
        const brandSet = new Set(MOCK_PRODUCTS.map(p => p.brand));
        return Array.from(brandSet).sort();
    }, []);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = [...MOCK_PRODUCTS];

        // Filter by subcategory (using category as a proxy since MOCK_PRODUCTS uses category field)
        // In a real app, you'd have subcategory field in the product data
        // For now, we'll show all products as the mock data doesn't have subcategory info

        // Filter by brand
        if (selectedBrands.length > 0) {
            filtered = filtered.filter(p => selectedBrands.includes(p.brand));
        }

        // Filter by price
        filtered = filtered.filter(p => p.price <= priceRange);

        // Sort
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default: // popular
                // Keep original order
                break;
        }

        return filtered;
    }, [selectedBrands, priceRange, sortBy]);

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setPriceRange(5000);
    };

    if (!subcategory) {
        return (
            <div className="max-w-[1440px] mx-auto px-6 py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Subcategory Not Found</h1>
                <Link href="/catalog" className="text-primary hover:underline">Back to Catalog</Link>
            </div>
        );
    }

    return (
        <div className="max-w-[1440px] mx-auto px-6 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
                <Link className="hover:text-primary uppercase tracking-wider" href="/">Home</Link>
                <span className="material-symbols-outlined !text-xs">chevron_right</span>
                <Link className="hover:text-primary uppercase tracking-wider" href="/catalog">Catalog</Link>
                <span className="material-symbols-outlined !text-xs">chevron_right</span>
                <Link className="hover:text-primary uppercase tracking-wider" href={`/catalog/${categorySlug}`}>{categoryName}</Link>
                <span className="material-symbols-outlined !text-xs">chevron_right</span>
                <span className="text-slate-900 dark:text-slate-100 uppercase tracking-wider">{subcategory.name}</span>
            </nav>

            {/* Page Header */}
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
                {/* Sidebar Filters */}
                <aside className="w-64 flex-shrink-0 hidden lg:block">
                    <div className="sticky top-24 space-y-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">Filters</h2>
                            <button
                                onClick={clearFilters}
                                className="text-xs font-bold text-primary hover:underline"
                            >
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
                                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                                        />
                                        <span className="text-sm font-medium group-hover:text-primary transition-colors">{brand}</span>
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
                                max="5000"
                            />
                            <div className="flex justify-between mt-3 text-xs font-bold text-slate-500">
                                <span>$0</span>
                                <span>${priceRange}+</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
                        <div className="text-sm font-medium text-slate-500">
                            Showing <span className="text-slate-900 dark:text-slate-100 font-bold">{filteredProducts.length}</span> products
                        </div>
                        <div className="flex items-center gap-4">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent border-none text-primary focus:ring-0 cursor-pointer font-bold pr-8"
                            >
                                <option value="popular">Most Popular</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="name">Name: A-Z</option>
                            </select>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
                            <h2 className="text-2xl font-bold mb-2">No products found</h2>
                            <p className="text-slate-500 mb-6">Try adjusting your filters</p>
                            <button
                                onClick={clearFilters}
                                className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:brightness-110 transition-all"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col shadow-sm hover:shadow-xl transition-all">
                                    <div className="relative aspect-square bg-slate-50 dark:bg-slate-950 overflow-hidden">
                                        <Link href={`/product/${product.id}`}>
                                            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500" />
                                        </Link>
                                        {product.status === 'New Arrival' && (
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded uppercase">New Arrival</span>
                                            </div>
                                        )}
                                        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined !text-primary">favorite</span>
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
                                                className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg hover:bg-primary hover:text-white transition-all"
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
};

export default SubcategoryPage;
