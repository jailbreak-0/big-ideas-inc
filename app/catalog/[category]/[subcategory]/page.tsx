import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getSubcategoriesByCategoryServer, getProductsServer } from '../../../../lib/supabase/queries';
import SubcategoryClient from './SubcategoryClient';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 300;

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
