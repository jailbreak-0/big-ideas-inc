
export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice?: number;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  status: 'In Stock' | 'Backorder' | 'New Arrival';
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  productName: string;
  productImage: string;
  status: 'Shipped' | 'Delivered' | 'Processing';
  total: number;
}
