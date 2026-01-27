"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/utils';

const CheckoutPage: React.FC = () => {
    const { cartItems } = useCart();
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const total = subtotal * 1.08;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="mb-10 max-w-3xl mx-auto">
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
                    <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-primary -translate-y-1/2 z-0"></div>

                    {['Shipping', 'Payment', 'Review'].map((step, i) => (
                        <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                            <div className={`size-10 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'bg-primary text-white shadow-lg' : 'bg-white border-2 border-slate-200 text-slate-400'}`}>
                                <span className="material-symbols-outlined">{i === 0 ? 'local_shipping' : i === 1 ? 'payments' : 'fact_check'}</span>
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-tighter ${i === 0 ? 'text-primary' : 'text-slate-400'}`}>{step}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-8">
                    <nav className="flex items-center gap-2 text-sm text-slate-500">
                        <Link className="hover:text-primary" href="/cart">Cart</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-slate-900 font-medium">Shipping Information</span>
                    </nav>
                    <h1 className="text-3xl font-extrabold">Checkout</h1>

                    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                                <h2 className="text-lg font-bold">Shipping Address</h2>
                            </div>
                            <span className="text-xs font-medium text-slate-500 uppercase">Step 1 of 3</span>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2">Full Name</label>
                                <input className="w-full rounded-lg border-slate-200" placeholder="John Coltrane" type="text" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold mb-2">Street Address</label>
                                <input className="w-full rounded-lg border-slate-200" placeholder="123 Jazz Lane" type="text" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-2">City</label>
                                <input className="w-full rounded-lg border-slate-200" placeholder="New York" type="text" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">State</label>
                                    <select className="w-full rounded-lg border-slate-200">
                                        <option>NY</option>
                                        <option>CA</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">ZIP Code</label>
                                    <input className="w-full rounded-lg border-slate-200" placeholder="10001" type="text" />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">speed</span>
                                <h2 className="text-lg font-bold">Delivery Method</h2>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <label className="relative flex items-center p-4 border-2 border-primary bg-primary/5 rounded-xl cursor-pointer">
                                <input checked readOnly className="text-primary focus:ring-primary h-5 w-5" name="shipping" type="radio" />
                                <div className="ml-4 flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold">Standard Ground Shipping</span>
                                        <span className="font-bold text-primary uppercase text-sm">Free</span>
                                    </div>
                                    <p className="text-sm text-slate-500">Delivered within 3-5 business days. Full tracking included.</p>
                                </div>
                            </label>
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-4">
                    <div className="sticky top-24 bg-white rounded-xl border border-slate-200 shadow-xl p-6">
                        <h2 className="text-lg font-bold mb-6">Order Summary</h2>
                        <div className="space-y-6 mb-6">
                            {cartItems.map(item => (
                                <div key={item.product.id} className="flex gap-4">
                                    <div className="size-16 bg-slate-100 rounded-lg overflow-hidden border">
                                        <img src={item.product.image} className="w-full h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold leading-tight">{item.product.name}</h3>
                                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                                        <p className="text-sm font-bold mt-1">${item.product.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3 pt-6 border-t">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Subtotal</span>
                                <span className="font-semibold">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">Total</span>
                                <span className="text-2xl font-black text-primary">${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg mt-6">Continue to Payment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
