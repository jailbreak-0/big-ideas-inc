"use client";

import React from 'react';
import { CartProvider } from '../context/CartContext';
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>
        </CartProvider>
    );
}
