"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { formatPrice, usdToGhs } from '../../lib/utils';

const CartPage: React.FC = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    return (
        <div className="max-w-350 mx-auto px-6 lg:px-20 py-10">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link className="hover:text-primary" href="/">Home</Link>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-slate-900 dark:text-slate-100 font-medium">Shopping Cart</span>
            </nav>

            <div className="mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Your Gear Rack</h1>
                <p className="text-slate-500">Review your components before final mastering.</p>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-white/5 rounded-3xl border border-dashed border-slate-300">
                    <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">shopping_cart_off</span>
                    <h2 className="text-2xl font-bold mb-4">Your rack is empty</h2>
                    <Link href="/catalog" className="bg-primary text-white px-8 py-3 rounded-xl font-bold">Start Shopping</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-8 space-y-4">
                        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-500">
                            <div className="col-span-6">Product Details</div>
                            <div className="col-span-2 text-center">Quantity</div>
                            <div className="col-span-2 text-right">Unit Price</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        {cartItems.map(item => (
                            <div key={item.product.id} className="group bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl p-6 transition-all hover:shadow-lg hover:border-primary/30">
                                <div className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-6 flex gap-6">
                                        <div className="size-24 rounded-lg bg-slate-50 dark:bg-slate-900 shrink-0 overflow-hidden border border-slate-100 dark:border-slate-800">
                                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain p-2" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{item.product.name}</h3>
                                            <p className="text-xs text-slate-400 mb-2">{item.product.brand}</p>
                                            <button
                                                onClick={() => removeFromCart(item.product.id)}
                                                className="text-xs text-slate-400 hover:text-red-500 cursor-pointer flex items-center gap-1 transition-colors self-start"
                                            >
                                                <span className="material-symbols-outlined text-sm">delete</span> Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-span-2 flex justify-center">
                                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900">
                                            <button onClick={() => updateQuantity(item.product.id, -1)} className="px-2 py-1 cursor-pointer hover:text-primary"><span className="material-symbols-outlined text-sm">remove</span></button>
                                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.product.id, 1)} className="px-2 py-1 cursor-pointer hover:text-primary"><span className="material-symbols-outlined text-sm">add</span></button>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-right text-sm font-medium">
                                        GH₵{item.product.price.toFixed(2)}
                                    </div>
                                    <div className="col-span-2 text-right text-lg font-bold text-primary">
                                        GH₵{(item.product.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white dark:bg-background-dark border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none">
                                <h2 className="text-xl font-extrabold mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Subtotal</span>
                                        <span className="font-medium">GH₵{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Shipping</span>
                                        <span className="text-emerald-500 font-bold uppercase text-xs">Free</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Est. Tax (15%)</span>
                                        <span className="font-medium">GH₵{tax.toFixed(2)}</span>
                                    </div>
                                    <div className="h-px bg-slate-100 dark:bg-slate-800 w-full my-2"></div>
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg font-bold">Grand Total</span>
                                        <div className="text-right">
                                            <p className="text-2xl font-extrabold text-primary">GH₵{total.toFixed(2)}</p>
                                            <p className="text-[10px] text-slate-400">Tax included</p>
                                        </div>
                                    </div>
                                </div>
                                <Link href="/checkout" className="w-full bg-primary hover:brightness-110 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20">
                                    PROCEED TO CHECKOUT
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
