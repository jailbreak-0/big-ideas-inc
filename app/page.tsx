"use client";

import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { MOCK_PRODUCTS } from '../constants';

const LandingPage = () => {
    const { addToCart } = useCart();
    const heroProduct = MOCK_PRODUCTS.find(p => p.id === '5');
    const featuredProducts = MOCK_PRODUCTS.filter(p => p.id !== '5');

    return (
        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {/* Hero Section */}
            <section className="px-4 sm:px-6 lg:px-10 pt-4 sm:pt-6 lg:pt-10">
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#0c1d1d] aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] flex items-center">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-50 sm:opacity-70"
                        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAE8p0SvHmkin-p80Jji4-3NsMLX7zzeySSwR33Atp2H6OSh574HXyVzypkqrBP9qZKnN1hVnDvzzO0ApBkUYqN2l_m_QCFB8kXeDKem6bIK6kCiiUjJSG-bzeft3CpxRG2rT_ckpq6NebCyN59jla8_Zxi9T6dFxCpo83o1Ic-CQqvILhXja2y0CBoCbiaszMw2wunWLPbKDOqJJwK10s774r_jBqv9HBICXsqdnRUlDpcbo1xVcoG55miatzbXO5ASRoX0ENTqaE1')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 sm:via-black/40 to-transparent"></div>
                    <div className="relative z-10 w-full max-w-2xl px-6 sm:px-8 lg:px-12 xl:px-20 space-y-3 sm:space-y-4 lg:space-y-6">
                        <span className="inline-block bg-primary px-2 sm:px-3 py-1 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white">New Release</span>
                        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-none tracking-tighter">
                            The Future of Synthesis.
                        </h2>
                        <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed font-light">
                            Experience the legendary Prophet-10 Rev 4. Hand-built analog warmth redesigned for the modern professional studio.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                            <Link href="/catalog" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all transform hover:-translate-y-1 text-center text-sm sm:text-base">
                                Shop Prophet-10
                            </Link>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-white/20 transition-all text-sm sm:text-base">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Bar */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 border-b border-[#e6f4f4] dark:border-white/5">
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-charcoal dark:text-white/60">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-2xl">verified_user</span>
                    <span className="leading-tight">3-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-charcoal dark:text-white/60">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-2xl">local_shipping</span>
                    <span className="leading-tight">Free Shipping $99+</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-charcoal dark:text-white/60">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-2xl">support_agent</span>
                    <span className="leading-tight">Expert Tech Support</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-charcoal dark:text-white/60">
                    <span className="material-symbols-outlined text-primary text-lg sm:text-2xl">keyboard_return</span>
                    <span className="leading-tight">30-Day Money Back</span>
                </div>
            </section>

            {/* Hot Deals */}
            <section className="px-4 sm:px-6 lg:px-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 sm:mb-8 gap-3">
                    <div>
                        <span className="text-primary font-bold uppercase tracking-widest text-[10px] sm:text-xs">Limited Opportunities</span>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Hot Deals & Bundles</h2>
                    </div>
                    <Link className="text-primary font-bold text-sm flex items-center gap-1 hover:underline" href="/catalog">View All Deals <span className="material-symbols-outlined">chevron_right</span></Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="sm:col-span-2 lg:row-span-2 bg-white dark:bg-[#1a1a1a] p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-charcoal/10 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded">SAVE $400</span>
                                <span className="material-symbols-outlined text-charcoal/20">favorite</span>
                            </div>
                            <div className="aspect-video mb-4 sm:mb-6 overflow-hidden rounded-xl">
                                <img
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC__89zTWgo7jrFLvCmdO52ks-IpLTZcsU354YO0yvBtyeARVvKrSq8cUoH6i4NLs2kB34O0ULzB4bm7fjpTiJhW6XUMj1-xtaXNH8O8KeXctlRntzNqxcCwjKG7FrAdp_YAWaeRYs2ywgM5uoGvGvilaIrLN09xeIOYLrcQpOxhpeZAOia7bn0kfXehGlOPjZ3JmAyoOYyxdWbnVrqmszhAhoj8gSMWP5qzB1J7TWNakK1zqNgpckQRuY077zQORZNTnpIUq3xHtA3"
                                    alt="Neumann KH 150 Pair"
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold mb-2">Neumann KH 150 Pair</h3>
                            <p className="text-charcoal/60 dark:text-white/60 text-sm mb-4 sm:mb-6">Bi-Amplified Studio Monitor with DSP and room correction. Precision German engineering for your mix.</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-charcoal/40 line-through text-sm">$3,200</span>
                                <div className="text-2xl sm:text-3xl font-black text-primary">$2,800</div>
                            </div>
                            <button
                                onClick={() => addToCart(MOCK_PRODUCTS[2])}
                                className="bg-primary h-12 w-12 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg shadow-primary/20"
                            >
                                <span className="material-symbols-outlined">add_shopping_cart</span>
                            </button>
                        </div>
                    </div>

                    {featuredProducts.slice(0, 2).map(product => (
                        <div key={product.id} className="bg-white dark:bg-[#1a1a1a] p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-charcoal/10 flex flex-col group shadow-sm hover:shadow-xl transition-all">
                            <div className="aspect-square mb-3 sm:mb-4 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900">
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <h4 className="font-bold text-sm line-clamp-1">{product.name}</h4>
                            <span className="text-charcoal/50 text-xs mb-3">{product.brand}</span>
                            <div className="mt-auto flex justify-between items-center">
                                <span className="font-black text-lg text-primary">${product.price}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
                                >
                                    <span className="material-symbols-outlined">add_shopping_cart</span>
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="sm:col-span-2 bg-primary/10 dark:bg-primary/5 border border-primary/20 p-6 sm:p-8 rounded-xl sm:rounded-2xl flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative overflow-hidden">
                        <div className="relative z-10 text-center sm:text-left">
                            <span className="text-primary font-black text-[10px] uppercase tracking-widest mb-2 block">Exclusive Bundle</span>
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Focusrite Scarlett 2i2 <br />Studio Starter Pack</h3>
                            <button className="text-primary font-bold text-sm border-b-2 border-primary">Grab the Bundle</button>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-primary/20 blur-3xl rounded-full"></div>
                        <div className="w-32 h-32 sm:w-40 sm:h-40 shrink-0">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcAyNkMq7p0siCZ6UzURRJdNanRhAsy6y8MyRxHK2Y2vpehaPtXh6JgkvOjlMi4rl8ZDkcGjRzSGeDMPljzx77Q8q7SYE0hlPq9-Q_z84gF6ybx06C9ThxF3wrke5-lhRSXIw70DslEDJ0sod3z2TE97MecejPKStOSUvFguR9kDPWF1pZiu3ZixRKFAbN5U06DFNl8xeS5HwwEnC-y44LKYo2ojwBJWxjiD-0VZ21jl6by2NzZLcgil3dyC26XjbduBXkuRKjh3P" alt="Bundle" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Top Categories */}
            <section className="px-4 sm:px-6 lg:px-10">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6 sm:mb-8">Top Categories</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[
                        { name: 'Electric Guitars', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbil7qwiBxoJh8mFMG2UEv0Ib_MmNauxUc3bcnnblKy9M8JPE8qXMcwxoFVFAVDR4YzFNMYOCo7T6wwEn9x2oFgXV_ZfrNlE1xmGZuvarKOJZonaUzkmRVhKYYpFENzaUA33RZgbEcYhZ2gKvLA226E65yasmR30HYfLfzV5wAl5wMpcSeJ5LQNmSzh4ZUwBRxq8ItYhIs8bWvCRMdCluJt7bW_HL41W85wtwL-V7uvG_CrSoU8qNpk-0yFiYjFfrPHYtex9eVgNsk' },
                        { name: 'Analog Synths', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAx_H4t83QufGPC6rKJWtQCpieLqwmbruDk_M3tk93AN5Sytx-MjP5hfwdVMo4KXb-PGIWEeyfD-iRYE9Ek6MPqFRxrk1HJfbBcfrc1oQyRpB0ippzN3nRdZfh5lqZPt-AEcF9E7ruT_RwulCu_IOZ1j59lUJK7LVwSgMH3YDfeY8juoCA2i3NXPNjDalDuz0jxsSy6st7tZyQfCqUKpF7u5Ru4Hg2QyMzQDQE6__uFS6yetUEPZmU_CGEnQ8JmzR7C209ZelMRfDP' },
                        { name: 'Studio Outboard', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5nDE8Ve9d_qPNLASLMCZouohBKQxKa6GvkkDxQTdRbkUqHQu-I5nXzSjmctmcB97qPD_jQtMua8hH0cSenTI7nk-6k0Wv4b8jR72UNuVCOpB3O7fFKf2v6E8JQuXjLpUPBDbPG_E4SwctiASXYoUgHEWx6_YFVbmFTSuFpdhvTkuj0p2FKUVQhULUXpa9E0a3LgEY82xzU7HBNOyiRyEFNpFjIoaj9ZD6ndSvx5yexQvhD6r-5OWbOiKGzRrvCtNTctIrtpu1iq3X' },
                        { name: 'Percussion', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZVcMkUSZ9eOI8Xk7s5BVgY9lQNmGW12J0A52BWDFx6GV4MtpCx5P-WgUeh22DmOZHcOYyXwuPJimXM33u998_eSH9Di-jByQB9y2--c5EYChVRUYGqLVAYHhDskbhVRKkije_vCNHDFKLR3BNbfmuUFfX6LDQHuFLzmhCvfWXD6nbdRu_sijvZdI1fKffSjHUiVOv8JDP1Djuu-kDuQoiYcQRgir80GDInzaoZVm8GKmWPev75j41oNnHlUFTMB3F_vQe-0xzL6j' }
                    ].map(cat => (
                        <Link href="/catalog" key={cat.name} className="group relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl cursor-pointer">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url('${cat.img}')` }}
                            />
                            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                                <p className="text-white text-base sm:text-xl font-extrabold tracking-tight">{cat.name}</p>
                                <p className="text-white/70 text-xs uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Explore Category</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Brands */}
            <section className="px-4 sm:px-6 lg:px-10">
                <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-10 opacity-40 grayscale">
                    <span className="text-xs font-bold uppercase tracking-widest shrink-0">Featured Brands</span>
                    <div className="h-px bg-charcoal/20 flex-1"></div>
                </div>
                <div className="flex justify-between items-center gap-6 sm:gap-12 overflow-x-auto hide-scrollbar pb-6 grayscale opacity-60">
                    {['Fender', 'Moog', 'Neumann', 'Roland', 'Focusrite', 'Yamaha', 'Ableton', 'Universal Audio'].map(brand => (
                        <div key={brand} className="text-sm sm:text-lg font-black tracking-tighter whitespace-nowrap">{brand}</div>
                    ))}
                </div>
            </section>

            {/* Consultation Section */}
            <section className="px-4 sm:px-6 lg:px-10">
                <div className="bg-charcoal/5 dark:bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
                    <div className="flex-1 space-y-4 sm:space-y-6 text-center lg:text-left">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">Professional Consultation <br className="hidden sm:block" />from Real Musicians.</h2>
                        <p className="text-charcoal/70 dark:text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg">
                            Not sure which interface fits your workflow? Our specialists are active engineers, producers, and musicians who use this gear every day in the studio. Get expert advice tailored to your sonic goals.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center lg:justify-start">
                            <Link href="/contact" className="bg-[#0c1d1d] dark:bg-primary text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all text-sm sm:text-base">
                                <span className="material-symbols-outlined">call</span>
                                Book a Consultation
                            </Link>
                            <button className="bg-white dark:bg-white/10 border border-charcoal/10 dark:border-white/10 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-slate-50 transition-all text-sm sm:text-base">
                                Live Chat Now
                            </button>
                        </div>
                    </div>
                    <div
                        className="w-full lg:w-1/3 aspect-square bg-cover bg-center rounded-2xl shadow-2xl rotate-3 max-w-xs lg:max-w-none"
                        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAJbPBG7VKkHD5WwoFWU8YHjw9EjRM-K4ID8Yj5Aa8M6Z0bbkASEkdD7EvphLEXTVz-WaydddtiK9xJEDoOavR29pqvfJJRzwRKj1NCI6zB_VJ5JWCg21tukmZwNRQAgNe6QiNNjghyb1awXBgjFAzcjTmZuHAtiuxGxNojGqLAyKcJ_EoCvl4eXsO3Fv91g9yG7d6krm-ZWo-k_26SUIxyAksO1bcSlMxzSGDMNrvhZlw4DqxoCqrv5dLGL6SifoSEHD2PXMr3T457')` }}
                    />
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
