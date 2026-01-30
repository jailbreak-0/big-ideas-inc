import React from 'react';
import Link from 'next/link';
import { getCategories } from '../../lib/supabase/queries';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 300;

export default async function CatalogPage() {
    const categories = await getCategories();

    return (
        <div className="max-w-360 mx-auto px-6 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
                <Link className="hover:text-primary uppercase tracking-wider" href="/">Home</Link>
                <span className="material-symbols-outlined text-xs!">chevron_right</span>
                <span className="text-slate-900 dark:text-slate-100 uppercase tracking-wider">Catalog</span>
            </nav>

            {/* Page Header */}
            <div className="mb-12">
                <h1 className="text-5xl font-extrabold tracking-tighter mb-4">Browse by Category</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
                    Explore our complete collection of professional music equipment. From guitars to studio gear, find everything you need to create your sound.
                </p>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories?.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/catalog/${category.slug}`}
                        className="group relative aspect-4/5 overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-linear-to-br from-slate-800 to-slate-900"
                        >
                            {category.image_url && (
                                <img 
                                    src={category.image_url} 
                                    alt={category.name}
                                    className="w-full h-full object-cover opacity-60"
                                />
                            )}
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/90" />
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                                <h3 className="text-white text-2xl font-extrabold tracking-tight mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {category.description}
                                </p>
                                <div className="flex items-center gap-2 mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-sm font-bold">Explore Category</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </div>

                        {/* Hover Border Effect */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />
                    </Link>
                ))}
            </div>

            {/* Featured Brands Section */}
            <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-6 mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Featured Brands</span>
                    <div className="h-px bg-slate-200 dark:border-slate-800 flex-1"></div>
                </div>
                <div className="flex justify-between items-center gap-12 overflow-x-auto hide-scrollbar pb-6 grayscale opacity-60 hover:opacity-100 transition-opacity">
                    {['Fender', 'Moog', 'Neumann', 'Roland', 'Focusrite', 'Yamaha', 'Ableton', 'Universal Audio'].map(brand => (
                        <div key={brand} className="text-lg font-black tracking-tighter whitespace-nowrap cursor-pointer hover:text-primary transition-colors">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
