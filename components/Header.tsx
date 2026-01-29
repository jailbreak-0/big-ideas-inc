"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import LoadingBar from './LoadingBar';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { cartCount } = useCart();
    const { user, signOut } = useAuth();
    const { products, categories } = useData();
    const searchRef = useRef<HTMLDivElement>(null);
    const mobileSearchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsAccountMenuOpen(false);
        setShowSuggestions(false);
        setSearchQuery('');
    }, [pathname]);

    // Close account menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('.account-menu-container')) {
                setIsAccountMenuOpen(false);
            }
        };
        if (isAccountMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isAccountMenuOpen]);

    // Close search suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (searchRef.current && !searchRef.current.contains(target) &&
                mobileSearchRef.current && !mobileSearchRef.current.contains(target)) {
                setShowSuggestions(false);
            }
        };
        if (showSuggestions) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [showSuggestions]);

    // Search suggestions
    const searchSuggestions = useMemo(() => {
        if (!searchQuery.trim() || !products) return [];

        const lowerQuery = searchQuery.toLowerCase();
        const filtered = products.filter(product => {
            return product.name.toLowerCase().includes(lowerQuery) ||
                   product.brand.toLowerCase().includes(lowerQuery);
        });

        return filtered.slice(0, 8); // Limit to 8 suggestions
    }, [searchQuery, products]);

    // Get category name
    const getCategoryName = (categoryId?: string) => {
        if (!categoryId || !categories) return null;
        return categories.find(cat => cat.id === categoryId)?.name;
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setShowSuggestions(false);
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleSuggestionClick = (productSlug: string) => {
        setShowSuggestions(false);
        setSearchQuery('');
        router.push(`/product/${productSlug}`);
    };

    const handleViewAllResults = () => {
        if (searchQuery.trim()) {
            setShowSuggestions(false);
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className={`top-0 z-50 transition-all duration-300 relative ${isScrolled ? 'bg-white/95 dark:bg-background-dark/95 backdrop-blur-md shadow-sm' : 'bg-white dark:bg-background-dark border-b border-slate-100 dark:border-white/10'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
                <Link href="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0 group">
                    <h1 className="text-base sm:text-xl font-extrabold tracking-tight dark:text-white uppercase">
                        Big Ideas <span className="text-primary">Inc.</span>
                    </h1>
                </Link>

                {/* Desktop Search */}
                <div className="flex-1 max-w-2xl hidden lg:block" ref={searchRef}>
                    <form onSubmit={handleSearch} className="relative group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10">search</span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => searchQuery && setShowSuggestions(true)}
                            className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all"
                            placeholder="Search instruments, studio gear, brands..."
                        />
                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && searchQuery && (
                            <div className="absolute top-full mt-2 w-full bg-white dark:bg-background-dark rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 py-2 z-50 max-h-125 overflow-y-auto">
                                {searchSuggestions.length > 0 ? (
                                    <>
                                        <div className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                                            Suggestions
                                        </div>
                                        {searchSuggestions.map(product => {
                                            const categoryName = getCategoryName('category_id' in product ? product.category_id : undefined);
                                            return (
                                                <button
                                                    key={product.id}
                                                    onClick={() => handleSuggestionClick(product.slug)}
                                                    className="w-full px-4 py-3 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left"
                                                >
                                                    <div className="w-12 h-12 bg-slate-100 dark:bg-white/5 rounded-lg shrink-0 overflow-hidden">
                                                        <img
                                                            src={product.image_url || ''}
                                                            alt={product.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                            {product.brand}
                                                        </p>
                                                        <p className="text-sm font-semibold text-charcoal dark:text-white truncate">
                                                            {product.name}
                                                        </p>
                                                        {categoryName && (
                                                            <p className="text-xs text-primary">{categoryName}</p>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-bold text-charcoal dark:text-white">
                                                            ${product.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                        <button
                                            onClick={handleViewAllResults}
                                            className="w-full px-4 py-3 text-sm text-primary font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 border-t border-slate-200 dark:border-white/10 mt-2"
                                        >
                                            View all results for "{searchQuery}"
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </button>
                                    </>
                                ) : (
                                    <div className="px-4 py-8 text-center">
                                        <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-700 mb-2">
                                            search_off
                                        </span>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            No products found for "{searchQuery}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
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
                    {user ? (
                        <div className="relative account-menu-container">
                            <button 
                                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                                className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-lg text-charcoal dark:text-white/70 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-primary transition-all"
                            >
                                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 dark:bg-primary/20 text-primary">
                                    <span className="material-symbols-outlined text-xl">person</span>
                                </div>
                                <div className="hidden lg:flex flex-col items-start">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">Welcome back</span>
                                    <span className="text-sm font-bold">{user.user_metadata?.display_name || user.email?.split('@')[0]}</span>
                                </div>
                                <span className={`material-symbols-outlined text-sm transition-transform hidden lg:block ${isAccountMenuOpen ? 'rotate-180' : ''}`}>
                                    expand_more
                                </span>
                            </button>
                            {isAccountMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-background-dark rounded-xl shadow-xl border border-slate-200 dark:border-white/10 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/10">
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.email}</p>
                                    </div>
                                    <div className="py-1">
                                        <Link 
                                            href="/dashboard" 
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">dashboard</span>
                                            Dashboard
                                        </Link>
                                        <Link 
                                            href="/dashboard/orders" 
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">shopping_bag</span>
                                            My Orders
                                        </Link>
                                        <Link 
                                            href="/dashboard/wishlist" 
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">favorite</span>
                                            Wishlist
                                        </Link>
                                        <Link 
                                            href="/dashboard/settings" 
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-lg">settings</span>
                                            Settings
                                        </Link>
                                    </div>
                                    <hr className="my-1 border-slate-100 dark:border-white/10" />
                                    <button 
                                        onClick={() => {
                                            setIsAccountMenuOpen(false);
                                            signOut();
                                        }}
                                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">logout</span>
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all font-bold text-sm">
                            <span className="material-symbols-outlined">login</span>
                            <span className="hidden sm:inline">Sign In</span>
                        </Link>
                    )}

                    {/* Cart Link */}
                    <Link href="/cart" className="flex flex-col items-center gap-0.5 sm:gap-1 relative text-charcoal dark:text-white/70 hover:text-primary transition-colors min-w-11 min-h-11 justify-center">
                        <span className="material-symbols-outlined text-xl sm:text-2xl">shopping_cart</span>
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 sm:-top-1 sm:-right-1 bg-primary text-white text-[10px] font-bold h-5 w-5 sm:h-4 sm:w-4 rounded-full flex items-center justify-center">{cartCount}</span>
                        )}
                        <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider hidden sm:block">Cart</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="lg:hidden px-4 sm:px-6 pb-3" ref={mobileSearchRef}>
                <form onSubmit={handleSearch} className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl z-10">search</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => searchQuery && setShowSuggestions(true)}
                        className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all"
                        placeholder="Search..."
                    />
                    {/* Mobile Search Suggestions */}
                    {showSuggestions && searchQuery && (
                        <div className="absolute top-full mt-2 w-full bg-white dark:bg-background-dark rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 py-2 z-50 max-h-100 overflow-y-auto">
                            {searchSuggestions.length > 0 ? (
                                <>
                                    <div className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                                        Suggestions
                                    </div>
                                    {searchSuggestions.map(product => (
                                        <button
                                            key={product.id}
                                            onClick={() => handleSuggestionClick(product.id)}
                                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-left"
                                        >
                                            <div className="w-10 h-10 bg-slate-100 dark:bg-white/5 rounded-lg shrink-0 overflow-hidden">
                                                <img
                                                    src={product.image_url || ''}
                                                    alt={product.name}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    {product.brand}
                                                </p>
                                                <p className="text-sm font-semibold text-charcoal dark:text-white truncate">
                                                    {product.name}
                                                </p>
                                            </div>
                                            <div className="text-xs font-bold text-charcoal dark:text-white">
                                                ${product.price.toLocaleString()}
                                            </div>
                                        </button>
                                    ))}
                                    <button
                                        onClick={handleViewAllResults}
                                        className="w-full px-4 py-3 text-sm text-primary font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 border-t border-slate-200 dark:border-white/10 mt-2"
                                    >
                                        View all results
                                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                    </button>
                                </>
                            ) : (
                                <div className="px-4 py-6 text-center">
                                    <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-700 mb-2">
                                        search_off
                                    </span>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        No products found
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </form>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block bg-slate-50 dark:bg-background-dark border-b border-slate-100 dark:border-white/5 overflow-x-auto hide-scrollbar">
                <div className="max-w-7xl mx-auto px-4 lg:px-10 flex items-center gap-10 h-12 whitespace-nowrap">
                    <Link href="/catalog" className={`flex items-center gap-2 text-sm font-bold tracking-wide h-full border-b-2 transition-colors ${pathname === '/catalog' ? 'text-primary border-primary' : 'text-charcoal dark:text-white/70 border-transparent hover:text-primary'}`}>
                        <span className="material-symbols-outlined text-xl!">menu</span>
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
                    <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-1">
                        {!user && (
                            <>
                                <Link href="/login" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-colors">
                                    <span className="material-symbols-outlined">login</span>
                                    Sign In / Sign Up
                                </Link>
                                <div className="border-t border-slate-100 dark:border-white/10 my-2"></div>
                            </>
                        )}
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
            <LoadingBar />
        </header>
    );
};

export default Header;
