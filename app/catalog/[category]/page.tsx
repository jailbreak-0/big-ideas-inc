import React from 'react';
import Link from 'next/link';
import { getCategoryBySlug, getSubcategoriesByCategory, getCategories } from '../../../lib/supabase/queries';
import { notFound } from 'next/navigation';

// Revalidate every 5 minutes
export const revalidate = 300;

// Generate static params for all categories
export async function generateStaticParams() {
    const categories = await getCategories();
    return categories.map((category) => ({
        category: category.slug,
    }));
}

interface PageProps {
    params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: categorySlug } = await params;
    
    const category = await getCategoryBySlug(categorySlug);
    if (!category) {
        notFound();
    }
    
    const subcategories = await getSubcategoriesByCategory(category.id);

    return (
        <div className="max-w-360 mx-auto px-6 py-8">
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
                <Link className="hover:text-primary uppercase tracking-wider" href="/">Home</Link>
                <span className="material-symbols-outlined text-xs!">chevron_right</span>
                <Link className="hover:text-primary uppercase tracking-wider" href="/catalog">Catalog</Link>
                <span className="material-symbols-outlined text-xs!">chevron_right</span>
                <span className="text-slate-900 dark:text-slate-100 uppercase tracking-wider">{category.name}</span>
            </nav>

            <div className="mb-12">
                <h1 className="text-5xl font-extrabold tracking-tighter mb-4">{category.name}</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
                    {category.description}
                </p>
            </div>

            {!subcategories || subcategories.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-slate-500">No subcategories found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subcategories.map((subcategory) => (
                        <Link
                            key={subcategory.id}
                            href={`/catalog/${categorySlug}/${subcategory.slug}`}
                            className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="relative aspect-video overflow-hidden bg-slate-50 dark:bg-slate-950">
                                {subcategory.image_url ? (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), url('${subcategory.image_url}')`
                                        }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-slate-900" />
                                )}
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {subcategory.name}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                    {subcategory.description}
                                </p>
                                <div className="flex items-center gap-2 text-primary text-sm font-bold">
                                    <span>Browse Products</span>
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
