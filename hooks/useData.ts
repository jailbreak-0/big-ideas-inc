"use client";

import { useState, useEffect, useCallback } from 'react';
import * as db from '../lib/supabase/client-queries';

interface UseDataOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

export function useProducts(params?: Parameters<typeof db.getProducts>[0], options: UseDataOptions = {}) {
  const { enabled = true, refetchOnMount = false } = options;
  const [data, setData] = useState<Awaited<ReturnType<typeof db.getProducts>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!enabled) return;
    
    try {
      setLoading(true);
      const result = await db.getProducts(params);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(params), enabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useProduct(slug: string | null, options: UseDataOptions = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState<Awaited<ReturnType<typeof db.getProductBySlug>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!enabled || !slug) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const result = await db.getProductBySlug(slug);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [slug, enabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useCategories(options: UseDataOptions = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState<Awaited<ReturnType<typeof db.getCategories>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!enabled) return;
    
    try {
      setLoading(true);
      const result = await db.getCategories();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useCategory(slug: string | null, options: UseDataOptions = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState<Awaited<ReturnType<typeof db.getCategoryBySlug>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!enabled || !slug) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const result = await db.getCategoryBySlug(slug);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [slug, enabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useSubcategories(categoryId: string | null, options: UseDataOptions = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState<Awaited<ReturnType<typeof db.getSubcategoriesByCategory>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!enabled || !categoryId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const result = await db.getSubcategoriesByCategory(categoryId);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [categoryId, enabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

export function useWishlist(userId: string | null, options: UseDataOptions = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState<Awaited<ReturnType<typeof db.getWishlist>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!enabled || !userId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const result = await db.getWishlist(userId);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId, enabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const addItem = useCallback(async (productId: string) => {
    if (!userId) return;
    try {
      await db.addToWishlist(userId, productId);
      await fetch();
    } catch (err) {
      setError(err as Error);
    }
  }, [userId, fetch]);

  const removeItem = useCallback(async (productId: string) => {
    if (!userId) return;
    try {
      await db.removeFromWishlist(userId, productId);
      await fetch();
    } catch (err) {
      setError(err as Error);
    }
  }, [userId, fetch]);

  return { data, loading, error, refetch: fetch, addItem, removeItem };
}

export function useCart(userId: string | null, options: UseDataOptions = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState<Awaited<ReturnType<typeof db.getCartItems>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!enabled || !userId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const result = await db.getCartItems(userId);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId, enabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const addItem = useCallback(async (productId: string, quantity = 1) => {
    if (!userId) return;
    try {
      await db.addToCart(userId, productId, quantity);
      await fetch();
    } catch (err) {
      setError(err as Error);
    }
  }, [userId, fetch]);

  const updateQuantity = useCallback(async (cartItemId: string, quantity: number) => {
    try {
      await db.updateCartItemQuantity(cartItemId, quantity);
      await fetch();
    } catch (err) {
      setError(err as Error);
    }
  }, [fetch]);

  const removeItem = useCallback(async (cartItemId: string) => {
    try {
      await db.removeFromCart(cartItemId);
      await fetch();
    } catch (err) {
      setError(err as Error);
    }
  }, [fetch]);

  const clear = useCallback(async () => {
    if (!userId) return;
    try {
      await db.clearCart(userId);
      await fetch();
    } catch (err) {
      setError(err as Error);
    }
  }, [userId, fetch]);

  return { data, loading, error, refetch: fetch, addItem, updateQuantity, removeItem, clear };
}

export function useOrders(userId: string | null, options: UseDataOptions = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState<Awaited<ReturnType<typeof db.getUserOrders>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!enabled || !userId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const result = await db.getUserOrders(userId);
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [userId, enabled]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

// Combined hook for fetching multiple data sources
export function useData() {
  const { data: products, loading: productsLoading } = useProducts();
  const { data: categories, loading: categoriesLoading } = useCategories();

  return {
    products: products || [],
    categories: categories || [],
    loading: productsLoading || categoriesLoading,
  };
}
