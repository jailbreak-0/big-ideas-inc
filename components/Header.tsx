"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-background-dark/95 backdrop-blur-md shadow-sm' : 'bg-white dark:bg-background-dark border-b border-slate-100 dark:border-white/10'}`}>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
                <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0 group">
                    <div className="bg-primary p-1 sm:p-1.5 rounded-lg text-white">
                        <span className="material-symbols-outlined !text-2xl sm:!text-3xl">waves</span>
                    </div>
                    <h1 className="text-base sm:text-xl font-extrabold tracking-tight dark:text-white uppercase">
                        Big Ideas <span className="text-primary">Inc.</span>
                    </h1>
                </Link>

                {/* Desktop Search */}
                <div className="flex-1 max-w-2xl hidden lg:block">
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input
                            type="text"
                            className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all"
                            placeholder="Search instruments, studio gear, brands..."
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-charcoal dark:text-white/70 hover:text-primary transition-colors"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>

                    {/* Account Link */}
                    <Link href="/dashboard" className="flex flex-col items-center gap-0.5 sm:gap-1 text-charcoal dark:text-white/70 hover:text-primary transition-colors min-w-[44px] min-h-[44px] justify-center">
                        <span className="material-symbols-outlined text-xl sm:text-2xl">person</span>
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider hidden sm:block">Account</span>
                    </Link>

                    {/* Cart Link */}
                    <Link href="/cart" className="flex flex-col items-center gap-0.5 sm:gap-1 relative text-charcoal dark:text-white/70 hover:text-primary transition-colors min-w-[44px] min-h-[44px] justify-center">
                        <span className="material-symbols-outlined text-xl sm:text-2xl">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 sm:-top-1 sm:-right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 sm:h-4 sm:w-4 rounded-full flex items-center justify-center">{cartCount}</span>
                        )}
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider hidden sm:block">Cart</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="lg:hidden px-4 sm:px-6 pb-3">
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                    <input
                        type="text"
                        className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Search..."
                    />
                </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block bg-slate-50 dark:bg-[#1a1a1a] border-b border-slate-100 dark:border-white/5 overflow-x-auto hide-scrollbar">
                <div className="max-w-[1440px] mx-auto px-4 lg:px-10 flex items-center gap-10 h-12 whitespace-nowrap">
                    <Link href="/catalog" className={`flex items-center gap-2 text-sm font-bold tracking-wide h-full border-b-2 transition-colors ${pathname === '/catalog' ? 'text-primary border-primary' : 'text-charcoal dark:text-white/70 border-transparent hover:text-primary'}`}>
                        <span className="material-symbols-outlined !text-xl">menu</span>
                        All Categories
                    </Link>
                    <Link href="/catalog/guitars-bass" className="text-sm font-semibold text-charcoal dark:text-white/80 hover:text-primary uppercase tracking-tight transition-colors">Guitars & Bass</Link>
                    <Link href="/catalog/synthesizers" className="text-sm font-semibold text-charcoal dark:text-white/80 hover:text-primary uppercase tracking-tight transition-colors">Synthesizers</Link>
                    <Link href="/catalog/studio-recording" className="text-sm font-semibold text-charcoal dark:text-white/80 hover:text-primary uppercase tracking-tight transition-colors">Studio & Recording</Link>
                    <Link href="/catalog/drums-percussion" className="text-sm font-semibold text-charcoal dark:text-white/80 hover:text-primary uppercase tracking-tight transition-colors">Drums</Link>
                    <Link href="/catalog/keys-pianos" className="text-sm font-semibold text-charcoal dark:text-white/80 hover:text-primary uppercase tracking-tight transition-colors">Keys & Pianos</Link>
                    <Link href="/about" className="text-sm font-semibold text-charcoal dark:text-white/80 hover:text-primary uppercase tracking-tight transition-colors">About</Link>
                    <Link href="/contact" className="text-sm font-semibold text-charcoal dark:text-white/80 hover:text-primary uppercase tracking-tight transition-colors">Support</Link>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-background-dark border-t border-slate-100 dark:border-white/10 shadow-lg">
                    <nav className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 space-y-1">
                        <Link
                            href="/catalog"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors ${pathname === '/catalog' ? 'bg-primary/10 text-primary' : 'text-charcoal dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined">menu</span>
                            All Categories
                        </Link>
                        <Link href="/catalog/guitars-bass" className="block px-4 py-3 rounded-lg text-sm font-semibold text-charcoal dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Guitars & Bass</Link>
                        <Link href="/catalog/synthesizers" className="block px-4 py-3 rounded-lg text-sm font-semibold text-charcoal dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Synthesizers</Link>
                        <Link href="/catalog/studio-recording" className="block px-4 py-3 rounded-lg text-sm font-semibold text-charcoal dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Studio & Recording</Link>
                        <Link href="/catalog/drums-percussion" className="block px-4 py-3 rounded-lg text-sm font-semibold text-charcoal dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Drums & Percussion</Link>
                        <Link href="/catalog/keys-pianos" className="block px-4 py-3 rounded-lg text-sm font-semibold text-charcoal dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Keys & Pianos</Link>
                        <div className="border-t border-slate-100 dark:border-white/10 my-2"></div>
                        <Link href="/about" className="block px-4 py-3 rounded-lg text-sm font-semibold text-charcoal dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">About</Link>
                        <Link href="/contact" className="block px-4 py-3 rounded-lg text-sm font-semibold text-charcoal dark:text-white/80 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Support</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
