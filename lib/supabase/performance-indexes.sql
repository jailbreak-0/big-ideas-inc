-- Performance Optimization Indexes for Big Ideas Inc.
-- Run this in your Supabase SQL Editor to improve query performance

-- Enable pg_trgm extension for text search (MUST BE FIRST)
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Additional indexes for search and filtering
CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON products USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_description_trgm ON products USING gin(description gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_products_brand_trgm ON products USING gin(brand gin_trgm_ops);

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_products_category_created ON products(category_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_subcategory_created ON products(subcategory_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_products_featured_created ON products(featured, created_at DESC) WHERE featured = true;

-- Index for price range queries
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);

-- Index for stock queries
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_quantity) WHERE stock_quantity > 0;

-- Composite index for cart lookups
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_product ON cart_items(cart_id, product_id);

-- Index for user's recent orders
CREATE INDEX IF NOT EXISTS idx_orders_user_created ON orders(user_id, created_at DESC);

-- Index for order status filtering
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Add statistics target for better query planning
ALTER TABLE products ALTER COLUMN name SET STATISTICS 1000;
ALTER TABLE products ALTER COLUMN category_id SET STATISTICS 1000;
ALTER TABLE products ALTER COLUMN price SET STATISTICS 1000;
