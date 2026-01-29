import { createClient } from './client';
import type { Database } from './database.types';

type Tables = Database['public']['Tables'];
type Product = Tables['products']['Row'];
type Category = Tables['categories']['Row'];
type Subcategory = Tables['subcategories']['Row'];
type WishlistItem = Tables['wishlists']['Row'];
type CartItem = Tables['cart_items']['Row'] & { product: Product };
type Order = Tables['orders']['Row'];

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: any; timestamp: number }>();

function getCacheKey(fn: string, params: any): string {
  return `${fn}-${JSON.stringify(params)}`;
}

function getFromCache<T>(key: string): T | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data as T;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export function clearCache(pattern?: string): void {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
}

// Categories
export async function getCategories() {
  const cacheKey = getCacheKey('categories', {});
  const cached = getFromCache<Category[]>(cacheKey);
  if (cached) return cached;

  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;
  setCache(cacheKey, data);
  return data;
}

export async function getCategoryBySlug(slug: string) {
  const cacheKey = getCacheKey('category', { slug });
  const cached = getFromCache<Category>(cacheKey);
  if (cached) return cached;

  const supabase = createClient();
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  setCache(cacheKey, data);
  return data;
}

// Server-side query functions (for App Router server components)
export async function getSubcategoriesByCategoryServer(categoryId: string) {
  const cacheKey = getCacheKey('subcategories', { categoryId });
  const cached = getFromCache<Subcategory[]>(cacheKey);
  if (cached) return cached;

  const supabase = createClient();
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId)
    .order('name');

  if (error) throw error;
  setCache(cacheKey, data);
  return data;
}

export async function getProductsServer(params?: {
  categoryId?: string;
  subcategoryId?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}) {
  const cacheKey = getCacheKey('products', params || {});
  const cached = getFromCache<Product[]>(cacheKey);
  if (cached) return cached;

  const supabase = createClient();
  let query = supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      brand,
      price,
      old_price,
      description,
      image_url,
      rating,
      reviews_count,
      status,
      featured,
      stock_quantity,
      category_id,
      subcategory_id,
      category:categories(name, slug),
      subcategory:subcategories(name, slug)
    `);

  if (params?.categoryId) query = query.eq('category_id', params.categoryId);
  if (params?.subcategoryId) query = query.eq('subcategory_id', params.subcategoryId);
  if (params?.featured !== undefined) query = query.eq('featured', params.featured);
  if (params?.search) {
    query = query.or(`name.ilike.%${params.search}%,brand.ilike.%${params.search}%,description.ilike.%${params.search}%`);
  }
  if (params?.limit) query = query.limit(params.limit);
  if (params?.offset) query = query.range(params.offset, params.offset + (params.limit || 10) - 1);

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  
  setCache(cacheKey, data);
  return data;
}

// Subcategories
export async function getSubcategoriesByCategory(categoryId: string) {
  const cacheKey = getCacheKey('subcategories', { categoryId });
  const cached = getFromCache<Subcategory[]>(cacheKey);
  if (cached) return cached;

  const supabase = createClient();
  const { data, error } = await supabase
    .from('subcategories')
    .select('*')
    .eq('category_id', categoryId)
    .order('name');

  if (error) throw error;
  setCache(cacheKey, data);
  return data;
}

// Products
export async function getProducts(params?: {
  categoryId?: string;
  subcategoryId?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}) {
  const cacheKey = getCacheKey('products', params || {});
  const cached = getFromCache<Product[]>(cacheKey);
  if (cached) return cached;

  const supabase = createClient();
  let query = supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      brand,
      price,
      old_price,
      description,
      image_url,
      rating,
      reviews_count,
      status,
      featured,
      category_id,
      subcategory_id,
      category:categories(name, slug),
      subcategory:subcategories(name, slug)
    `);

  if (params?.categoryId) query = query.eq('category_id', params.categoryId);
  if (params?.subcategoryId) query = query.eq('subcategory_id', params.subcategoryId);
  if (params?.featured !== undefined) query = query.eq('featured', params.featured);
  if (params?.search) {
    query = query.or(`name.ilike.%${params.search}%,brand.ilike.%${params.search}%,description.ilike.%${params.search}%`);
  }
  if (params?.limit) query = query.limit(params.limit);
  if (params?.offset) query = query.range(params.offset, params.offset + (params.limit || 10) - 1);

  query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  if (error) throw error;
  
  setCache(cacheKey, data);
  return data;
}

export async function getProductBySlug(slug: string) {
  const cacheKey = getCacheKey('product', { slug });
  const cached = getFromCache<Product>(cacheKey);
  if (cached) return cached;

  const supabase = createClient();
  const { data, error } = await supabase
    .from('products')
    .select(`
      id,
      name,
      slug,
      brand,
      price,
      old_price,
      description,
      image_url,
      rating,
      reviews_count,
      status,
      specs,
      stock_quantity,
      category_id,
      subcategory_id,
      category:categories(name, slug),
      subcategory:subcategories(name, slug)
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;
  setCache(cacheKey, data);
  return data;
}

export async function getFeaturedProducts(limit = 6) {
  return getProducts({ featured: true, limit });
}

// Wishlist
export async function getWishlist(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('wishlists')
    .select(`
      id,
      product_id,
      created_at,
      product:products(
        id,
        name,
        slug,
        brand,
        price,
        image_url,
        status
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function addToWishlist(userId: string, productId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('wishlists')
    .insert({ user_id: userId, product_id: productId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeFromWishlist(userId: string, productId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) throw error;
}

// Cart
export async function getOrCreateCart(userId: string) {
  const supabase = createClient();
  
  // Try to get existing cart
  let { data: cart, error: fetchError } = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

  // Create cart if doesn't exist
  if (!cart) {
    const { data: newCart, error: createError } = await supabase
      .from('carts')
      .insert({ user_id: userId })
      .select()
      .single();

    if (createError) throw createError;
    cart = newCart;
  }

  return cart;
}

export async function getCartItems(userId: string) {
  const supabase = createClient();
  const cart = await getOrCreateCart(userId);

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      product_id,
      created_at,
      product:products(
        id,
        name,
        slug,
        brand,
        price,
        image_url,
        stock_quantity,
        status
      )
    `)
    .eq('cart_id', cart.id);

  if (error) throw error;
  return data;
}

export async function addToCart(userId: string, productId: string, quantity = 1) {
  const supabase = createClient();
  const cart = await getOrCreateCart(userId);

  // Check if item already exists
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_id', cart.id)
    .eq('product_id', productId)
    .single();

  if (existingItem) {
    // Update quantity
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity: existingItem.quantity + quantity })
      .eq('id', existingItem.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    // Insert new item
    const { data, error } = await supabase
      .from('cart_items')
      .insert({ cart_id: cart.id, product_id: productId, quantity })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  const supabase = createClient();
  
  if (quantity <= 0) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;
    return null;
  }

  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeFromCart(cartItemId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);

  if (error) throw error;
}

export async function clearCart(userId: string) {
  const supabase = createClient();
  const cart = await getOrCreateCart(userId);

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_id', cart.id);

  if (error) throw error;
}

// Orders
export async function getUserOrders(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createOrder(
  userId: string,
  orderData: {
    total: number;
    items: Array<{ product_id: string; quantity: number; price: number; product_name: string; product_image: string }>;
    shipping_address?: any;
    billing_address?: any;
    payment_method?: string;
  }
) {
  const supabase = createClient();

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total: orderData.total,
      shipping_address: orderData.shipping_address,
      billing_address: orderData.billing_address,
      payment_method: orderData.payment_method,
      status: 'Processing',
    })
    .select()
    .single();

  if (orderError) throw orderError;

  // Create order items
  const orderItems = orderData.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    product_image: item.product_image,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  // Clear cart
  await clearCart(userId);

  return order;
}
