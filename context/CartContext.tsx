"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Load cart from local storage on mount (optional, nice to have)
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(item => item.product.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.product.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
