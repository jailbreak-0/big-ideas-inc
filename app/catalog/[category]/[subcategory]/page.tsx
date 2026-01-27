import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getSubcategoriesByCategoryServer, getProductsServer, getCategories, getSubcategoriesByCategory } from '../../../../lib/supabase/queries';
import SubcategoryClient from './SubcategoryClient';

// Revalidate every 5 minutes
export const revalidate = 300;

// Generate static params for all category/subcategory combinations
// Use client-side queries since this runs at build time without request context
export async function generateStaticParams() {
    const categories = await getCategories();
    const params = [];
    
    for (const category of categories) {
        const subcategories = await getSubcategoriesByCategory(category.id);
        for (const subcategory of subcategories) {
            params.push({
                category: category.slug,
                subcategory: subcategory.slug,
            });
        }
    }
    
    return params;
}

interface PageProps {
    params: Promise<{ category: string; subcategory: string }>;
}

export default async function SubcategoryPage({ params }: PageProps) {
    const { category: categorySlug, subcategory: subcategorySlug } = await params;
    
    // Parallel data fetching for better performance
    const category = await getCategoryBySlug(categorySlug);
    if (!category) {
        notFound();
    }
    
    // Fetch subcategories and products in parallel
    const [subcategories, allProducts] = await Promise.all([
        getSubcategoriesByCategoryServer(category.id),
        getProductsServer({ categoryId: category.id })
    ]);
    
    const subcategory = subcategories.find(sub => sub.slug === subcategorySlug);
    if (!subcategory) {
        notFound();
    }
    
    // Filter products for this specific subcategory
    const products = allProducts.filter(p => p.subcategory_id === subcategory.id);

    return (
        <SubcategoryClient
            categorySlug={categorySlug}
            categoryName={category.name}
            subcategory={subcategory}
            initialProducts={products}
        />
    );
}
