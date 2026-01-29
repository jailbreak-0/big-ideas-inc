import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getSubcategoriesByCategoryServer, getProductsServer, getCategories, getSubcategoriesByCategory } from '../../../../lib/supabase/queries';
import SubcategoryClient from './SubcategoryClient';

// Revalidate every 5 minutes
export const revalidate = 300;
export const dynamicParams = true; // Allow dynamic params at runtime

// Generate static params for all category/subcategory combinations
// Use client-side queries since this runs at build time without request context
export async function generateStaticParams() {
    try {
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
    } catch (error) {
        console.error('Error generating static params:', error);
        return [];
    }
}

interface PageProps {
    params: Promise<{ category: string; subcategory: string }>;
}

export default async function SubcategoryPage({ params }: PageProps) {
    const { category: categorySlug, subcategory: subcategorySlug } = await params;
    
    // Fetch category
    const category = await getCategoryBySlug(categorySlug);
    if (!category) {
        notFound();
    }
    
    // Fetch subcategories first to get the subcategory ID
    const subcategories = await getSubcategoriesByCategoryServer(category.id);
    
    const subcategory = subcategories.find(sub => sub.slug === subcategorySlug);
    if (!subcategory) {
        notFound();
    }
    
    // Fetch products filtered by both category and subcategory
    const products = await getProductsServer({ 
        categoryId: category.id,
        subcategoryId: subcategory.id 
    });

    return (
        <SubcategoryClient
            categorySlug={categorySlug}
            categoryName={category.name}
            subcategory={subcategory}
            initialProducts={products}
        />
    );
}
