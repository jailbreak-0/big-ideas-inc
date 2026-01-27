
import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => (
    <footer className="bg-white dark:bg-[#111] border-t border-charcoal/10 dark:border-white/5 pt-20 pb-10 mt-20">
        <div className="max-w-360 mx-auto px-4 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg text-white">
                            <span className="material-symbols-outlined text-2xl!">waves</span>
                        </div>
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
                    <p className="text-xs text-charcoal/50">Exclusive early access to new releases & deals.</p>
                    <div className="flex gap-2">
                        <input className="bg-charcoal/5 dark:bg-white/5 border-none rounded-lg text-sm w-full" placeholder="Email address" type="email" />
                        <button className="bg-primary px-4 py-2 rounded-lg cursor-pointer text-white font-bold hover:bg-primary/80 transition-colors"><span className="material-symbols-outlined">arrow_forward</span></button>
                    </div>
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

export default Footer;
