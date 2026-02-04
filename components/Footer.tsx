'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { subscribeToNewsletter } from '@/lib/supabase/newsletter';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        const result = await subscribeToNewsletter(email);

        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            setEmail('');
        } else {
            setMessage({ type: 'error', text: result.message });
        }

        setLoading(false);

        // Clear message after 5 seconds
        setTimeout(() => setMessage(null), 5000);
    };

    return (
    <footer className="bg-white dark:bg-[#111] border-t border-charcoal/10 dark:border-white/5 pt-20 pb-10 mt-20">
        <div className="max-w-360 mx-auto px-4 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-extrabold tracking-tight dark:text-white uppercase">Big Ideas <span className="text-primary">Inc.</span></h1>
                    </div>
                    <p className="text-charcoal/60 dark:text-white/50 max-w-sm leading-relaxed">
                        Leading provider of professional musical instruments and studio equipment since 1994. Quality-tested and musician-approved.
                    </p>
                    <div className="flex gap-4">
                        <a className="h-10 w-10 flex items-center justify-center rounded-full bg-charcoal/5 dark:bg-white/5 hover:bg-primary transition-colors hover:text-white group" href="#" aria-label="Facebook">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a className="h-10 w-10 flex items-center justify-center rounded-full bg-charcoal/5 dark:bg-white/5 hover:bg-primary transition-colors hover:text-white group" href="#" aria-label="Instagram">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </a>
                        <a className="h-10 w-10 flex items-center justify-center rounded-full bg-charcoal/5 dark:bg-white/5 hover:bg-primary transition-colors hover:text-white group" href="#" aria-label="Twitter">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a className="h-10 w-10 flex items-center justify-center rounded-full bg-charcoal/5 dark:bg-white/5 hover:bg-primary transition-colors hover:text-white group" href="#" aria-label="YouTube">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="space-y-6">
                    <h4 className="font-bold uppercase tracking-widest text-xs">Shop</h4>
                    <ul className="space-y-4 text-sm text-charcoal/70 dark:text-white/60">
                        <li><Link className="hover:text-primary" href="/catalog">New Arrivals</Link></li>
                        <li><a className="hover:text-primary" href="#">Top Sellers</a></li>
                        <li><a className="hover:text-primary" href="#">Bundles</a></li>
                        <li><a className="hover:text-primary" href="#">Outlet</a></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-bold uppercase tracking-widest text-xs">Support</h4>
                    <ul className="space-y-4 text-sm text-charcoal/70 dark:text-white/60">
                        <li><Link className="hover:text-primary" href="/about">FAQ</Link></li>
                        <li><a className="hover:text-primary" href="#">Shipping Info</a></li>
                        <li><a className="hover:text-primary" href="#">Returns</a></li>
                        <li><Link className="hover:text-primary" href="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="space-y-6">
                    <h4 className="font-bold uppercase tracking-widest text-xs">Join our List</h4>
                    <p className="text-xs text-charcoal/50 dark:text-white/50">Exclusive early access to new releases & deals.</p>
                    <form onSubmit={handleSubscribe} className="space-y-2">
                        <div className="flex gap-2">
                            <input 
                                className="bg-charcoal/5 dark:bg-white/5 border-none rounded-lg text-sm w-full px-3 py-2 dark:text-white" 
                                placeholder="Email address" 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                            <button 
                                type="submit"
                                disabled={loading}
                                className="bg-primary px-4 py-2 rounded-lg cursor-pointer text-white font-bold hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="material-symbols-outlined">{loading ? 'progress_activity' : 'arrow_forward'}</span>
                            </button>
                        </div>
                        {message && (
                            <p className={`text-xs ${message.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {message.text}
                            </p>
                        )}
                    </form>
                </div>
            </div>
            <div className="pt-10 border-t border-charcoal/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs text-charcoal/40">© 2024 ProAudio Gear. All professional rights reserved.</p>
                <div className="flex items-center gap-6 grayscale opacity-50">
                    <span className="text-[10px] font-black">VISA</span>
                    <span className="text-[10px] font-black">MASTERCARD</span>
                    <span className="text-[10px] font-black">PAYPAL</span>
                    <span className="text-[10px] font-black">APPLE PAY</span>
                </div>
            </div>
        </div>
    </footer>
    );
};

export default Footer;
