import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types';

type Tables = Database['public']['Tables'];
type Category = Tables['categories']['Row'];
type Subcategory = Tables['subcategories']['Row'];

// For build-time and static generation - doesn't use cookies
function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables:', {
      url: !!supabaseUrl,
      key: !!supabaseKey
    });
    throw new Error('Supabase URL and key are required for static generation');
  }
  
  return createSupabaseClient<Database>(supabaseUrl, supabaseKey)
}

// Categories - for static generation
export async function getCategories(): Promise<Category[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

// Subcategories - for static generation
export async function getSubcategoriesByCategory(categoryId: string): Promise<Subcategory[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId)
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function getSubcategoryBySlug(categoryId: string, slug: string): Promise<Subcategory | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}
