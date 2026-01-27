# Database Setup Instructions

## Overview
This project uses Supabase as the backend database with a comprehensive e-commerce schema including products, categories, orders, cart, and wishlist functionality.

## Setup Steps

### 1. Run the Database Schema

1. Log into your Supabase Dashboard at https://supabase.com/dashboard
2. Navigate to your project: `big-ideas-inc`
3. Go to the **SQL Editor** in the left sidebar
4. Open `lib/supabase/schema.sql`
5. Copy the entire contents and paste into the SQL Editor
6. Click **Run** to create all tables, indexes, and security policies

This will create:
- **categories** - Product categories (Guitars, Synths, etc.)
- **subcategories** - Sub-categories within main categories
- **products** - All product information
- **product_images** - Multiple images per product
- **wishlists** - User wishlists
- **carts** - User shopping carts
- **cart_items** - Items in carts
- **orders** - Order history
- **order_items** - Items within orders
- **reviews** - Product reviews

### 2. Seed Sample Data

1. Open `lib/supabase/seed.sql`
2. Copy the entire contents and paste into the SQL Editor
3. Click **Run** to populate initial data

This will add:
- 6 main categories
- 24 subcategories
- Sample products

### 3. Add More Products (Optional)

You can add more products directly in Supabase:

1. Go to **Table Editor** → **products**
2. Click **Insert row**
3. Fill in the required fields:
   - name, slug, brand, price, description, image_url
   - Select category_id and subcategory_id from dropdowns
   - Set featured=true for homepage display

## Database Query System

### Caching Strategy
The `lib/supabase/queries.ts` file implements intelligent caching:
- **Cache Duration**: 5 minutes for static data (categories, products)
- **Real-time Data**: Cart, wishlist, and orders are never cached
- **Cache Invalidation**: Use `clearCache()` to refresh specific data

### Optimized Hooks
Use the React hooks in `hooks/useData.ts` for optimal performance:

```typescript
import { useProducts, useCart, useWishlist } from '@/hooks/useData';

// Fetch products with automatic caching
const { data: products, loading, error } = useProducts({ 
  categoryId: 'uuid',
  featured: true,
  limit: 12 
});

// Cart operations
const { data: cart, addItem, removeItem } = useCart(userId);

// Wishlist operations
const { data: wishlist, addItem, removeItem } = useWishlist(userId);
```

### Key Features

1. **Automatic Caching**: Reduces API calls for frequently accessed data
2. **Lazy Loading**: Only fetches when `enabled: true` (default)
3. **Error Handling**: Built-in error states
4. **Loading States**: Track loading status automatically
5. **Refetch**: Manual refetch capability with `refetch()`

## Performance Optimizations

### 1. Database Indexes
All critical queries have indexes:
- Product lookups by slug, category, subcategory
- User-specific data (cart, wishlist, orders)
- Foreign key relationships

### 2. Row Level Security (RLS)
- Public read access for products and categories
- User-specific access for carts, wishlists, and orders
- Automatic security via Supabase Auth

### 3. Query Optimization
- Selective field fetching with `.select()`
- Pagination with `.limit()` and `.range()`
- Filtered queries to reduce data transfer
- JOIN operations only when needed

### 4. Client-Side Optimization
- In-memory caching reduces redundant API calls
- Hooks prevent re-fetching on component re-renders
- Conditional fetching with `enabled` option

## Usage Examples

### Fetch Featured Products
```typescript
const { data } = useProducts({ featured: true, limit: 6 });
```

### Search Products
```typescript
const { data } = useProducts({ search: 'guitar' });
```

### Get Products by Category
```typescript
const { data: category } = useCategory('guitars-bass');
const { data: products } = useProducts({ 
  categoryId: category?.id 
}, { enabled: !!category });
```

### Add to Cart
```typescript
const { addItem } = useCart(user?.id);
await addItem(productId, quantity);
```

### Create Order
```typescript
import { createOrder } from '@/lib/supabase/queries';

const order = await createOrder(userId, {
  total: 299.99,
  items: cartItems.map(item => ({
    product_id: item.product.id,
    quantity: item.quantity,
    price: item.product.price,
    product_name: item.product.name,
    product_image: item.product.image_url
  })),
  shipping_address: { ... },
  payment_method: 'credit_card'
});
```

## Environment Variables

Make sure your `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=https://ttbzoaxuqxscnrwwlioy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Maintenance

### Clear Cache
```typescript
import { clearCache } from '@/lib/supabase/queries';

// Clear all cache
clearCache();

// Clear specific pattern
clearCache('products');
```

### Update Product Count
When products are added/removed, update subcategory counts:
```sql
UPDATE subcategories 
SET item_count = (
  SELECT COUNT(*) 
  FROM products 
  WHERE subcategory_id = subcategories.id
);
```

## Troubleshooting

### "relation does not exist" Error
Run the schema.sql file first to create all tables.

### "permission denied" Error
Check that RLS policies are enabled and configured correctly.

### Slow Queries
Check the indexes are created properly and use `.explain()` to analyze query performance.

### Cache Not Updating
Call `clearCache()` or wait 5 minutes for automatic expiration.
