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
                        <a className="h-10 w-10 flex items-center justify-center rounded-full bg-charcoal/5 dark:bg-white/5 hover:bg-primary transition-colors hover:text-white" href="#"><span className="material-symbols-outlined text-xl">public</span></a>
                        <a className="h-10 w-10 flex items-center justify-center rounded-full bg-charcoal/5 dark:bg-white/5 hover:bg-primary transition-colors hover:text-white" href="#"><span className="material-symbols-outlined text-xl">movie</span></a>
                        <a className="h-10 w-10 flex items-center justify-center rounded-full bg-charcoal/5 dark:bg-white/5 hover:bg-primary transition-colors hover:text-white" href="#"><span className="material-symbols-outlined text-xl">camera</span></a>
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
