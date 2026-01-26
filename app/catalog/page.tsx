"use client";

import React from 'react';
import Link from 'next/link';

const categories = [
    {
        name: 'Guitars & Bass',
        description: 'Electric, acoustic, and bass guitars from legendary brands',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbil7qwiBxoJh8mFMG2UEv0Ib_MmNauxUc3bcnnblKy9M8JPE8qXMcwxoFVFAVDR4YzFNMYOCo7T6wwEn9x2oFgXV_ZfrNlE1xmGZuvarKOJZonaUzkmRVhKYYpFENzaUA33RZgbEcYhZ2gKvLA226E65yasmR30HYfLfzV5wAl5wMpcSeJ5LQNmSzh4ZUwBRxq8ItYhIs8bWvCRMdCluJt7bW_HL41W85wtwL-V7uvG_CrSoU8qNpk-0yFiYjFfrPHYtex9eVgNsk',
        itemCount: 156,
        slug: 'guitars-bass'
    },
    {
        name: 'Synthesizers',
        description: 'Analog and digital synths for modern sound design',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAx_H4t83QufGPC6rKJWtQCpieLqwmbruDk_M3tk93AN5Sytx-MjP5hfwdVMo4KXb-PGIWEeyfD-iRYE9Ek6MPqFRxrk1HJfbBcfrc1oQyRpB0ippzN3nRdZfh5lqZPt-AEcF9E7ruT_RwulCu_IOZ1j59lUJK7LVwSgMH3YDfeY8juoCA2i3NXPNjDalDuz0jxsSy6st7tZyQfCqUKpF7u5Ru4Hg2QyMzQDQE6__uFS6yetUEPZmU_CGEnQ8JmzR7C209ZelMRfDP',
        itemCount: 89,
        slug: 'synthesizers'
    },
    {
        name: 'Studio & Recording',
        description: 'Professional monitors, interfaces, and outboard gear',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5nDE8Ve9d_qPNLASLMCZouohBKQxKa6GvkkDxQTdRbkUqHQu-I5nXzSjmctmcB97qPD_jQtMua8hH0cSenTI7nk-6k0Wv4b8jR72UNuVCOpB3O7fFKf2v6E8JQuXjLpUPBDbPG_E4SwctiASXYoUgHEWx6_YFVbmFTSuFpdhvTkuj0p2FKUVQhULUXpa9E0a3LgEY82xzU7HBNOyiRyEFNpFjIoaj9ZD6ndSvx5yexQvhD6r-5OWbOiKGzRrvCtNTctIrtpu1iq3X',
        itemCount: 234,
        slug: 'studio-recording'
    },
    {
        name: 'Drums & Percussion',
        description: 'Acoustic kits, electronic drums, and percussion instruments',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3ZVcMkUSZ9eOI8Xk7s5BVgY9lQNmGW12J0A52BWDFx6GV4MtpCx5P-WgUeh22DmOZHcOYyXwuPJimXM33u998_eSH9Di-jByQB9y2--c5EYChVRUYGqLVAYHhDskbhVRKkije_vCNHDFKLR3BNbfmuUFfX6LDQHuFLzmhCvfWXD6nbdRu_sijvZdI1fKffSjHUiVOv8JDP1Djuu-kDuQoiYcQRgir80GDInzaoZVm8GKmWPev75j41oNnHlUFTMB3F_vQe-0xzL6j',
        itemCount: 127,
        slug: 'drums-percussion'
    },
    {
        name: 'Keys & Pianos',
        description: 'Digital pianos, stage keyboards, and MIDI controllers',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg_L7eEoipCgCeGhPrTmr3jryMwYPoRkGK9UU9_u3q2wWCPh-HQ9l8qK6lhk667lAiIxhpdbDXNdX1DhvXb-mZBMC5gA0FMQ-VJObwplmtd34RLaafJIxYODMSwl1Ly3o_AN9_WyEyMx8B7QiUMFCzxYv75NPbVLlzeccdDwtmV-7akHkJTP22p73f10PgriHOy1k27EgcjmSnhlfvPLw662VcMY6XK_ifeyoKULDiMg1e2VabumEvgGRsvE7g6Q4iHeWbmB7wZD-A',
        itemCount: 98,
        slug: 'keys-pianos'
    },
    {
        name: 'DJ & Production',
        description: 'Controllers, mixers, and production equipment',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHcV4mi4N7OB3vHlhmZJDbYucPyDFjivQ3--zc7zFwfQpChmTk5TyKcrwccK8v6dZ25ivBOCqrhgFiNXJPNr-lRk6KQo6R2SIZdRI8_WBEMmJVbCsf7iEUOjsVkYBGvqijOdwYqcKRtr3DSvqIsoJ_k2lZ4CzmR59lj1w749JWZRwAY-MJPTzwoIxfgba_ArBwTml0BajI3vGlnY6cQFmZg9WVeuX_NtyE67P0pckZnkbUL3lH5iIhq3KOBf2PnKvx8YoMBoWkNgO-',
        itemCount: 145,
        slug: 'dj-production'
    },
    {
        name: 'Wind & Brass',
        description: 'Woodwinds, brass, and percussion instruments',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHcV4mi4N7OB3vHlhmZJDbYucPyDFjivQ3--zc7zFwfQpChmTk5TyKcrwccK8v6dZ25ivBOCqrhgFiNXJPNr-lRk6KQo6R2SIZdRI8_WBEMmJVbCsf7iEUOjsVkYBGvqijOdwYqcKRtr3DSvqIsoJ_k2lZ4CzmR59lj1w749JWZRwAY-MJPTzwoIxfgba_ArBwTml0BajI3vGlnY6cQFmZg9WVeuX_NtyE67P0pckZnkbUL3lH5iIhq3KOBf2PnKvx8YoMBoWkNgO-',
        itemCount: 145,
        slug: 'wind-brass'
    },
    {
        name: 'Amplifiers',
        description: 'Guitar amps, bass amps, and PA systems',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCS3zfXFqbfwvYUF8eAb0dLHFzQySs9GB3WNBAXPA_lJvmHNnL54KcCK0SpyM7VUK7TkdZ93dzMhTTIq3Mrl-GgGrkZoWJdpIT8nCSD8h1ZYowXlLMTY6rVAC6n7zaK7YyALCdaT2pOMKu0Ok2O-dbyObLmKG3pRG_u5RfyCNd-3Hr2Hi3LzdSXZHcZJun8NAjYNB2Tl366tzXsV_qKpdJSfjhXKzTaAVN5MFa6rwE62FAqLDIpauHh4XpUg7MGuUCoHylXai5eN_r',
        itemCount: 76,
        slug: 'amplifiers'
    },
    {
        name: 'Accessories',
        description: 'Cables, stands, cases, and essential gear',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoR-_dFaL_lHvgDUGC_e0AeO33bCu3HOTLylK2yeqjKSBbPywNYluMt2ncb-cE2J8370EqlUYXu6gU9SM8awtybV_KE601Rzo4PO-OLrk9JF963rIkY_T4vZGctsYv_Pb7KUJyCJfMB61ZLOEuWm3uK9yy8zHWYH-p6UFAm6W17d92s3hydxWWhGn5pT_4srqRa4lC4HFr7N6SjJIRhHa3Xd7MiMIWHxmU9Cl4RlV9sLFN1lvHaEWXrUIiXfafeHSHaR66VF653Yh5',
        itemCount: 312,
        slug: 'accessories'
    }
];

const CatalogPage: React.FC = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-6 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
                <Link className="hover:text-primary uppercase tracking-wider" href="/">Home</Link>
                <span className="material-symbols-outlined !text-xs">chevron_right</span>
                <span className="text-slate-900 dark:text-slate-100 uppercase tracking-wider">Catalog</span>
            </nav>

            {/* Page Header */}
            <div className="mb-12">
                <h1 className="text-5xl font-extrabold tracking-tighter mb-4">Browse by Category</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
                    Explore our complete collection of professional music equipment. From guitars to studio gear, find everything you need to create your sound.
                </p>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <Link
                        key={category.slug}
                        href={`/catalog/${category.slug}`}
                        className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.9) 100%), url('${category.image}')`
                            }}
                        />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-2 py-1 rounded backdrop-blur-sm">
                                        {category.itemCount} Items
                                    </span>
                                </div>
                                <h3 className="text-white text-2xl font-extrabold tracking-tight mb-2">
                                    {category.name}
                                </h3>
                                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {category.description}
                                </p>
                                <div className="flex items-center gap-2 mt-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-sm font-bold">Explore Category</span>
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </div>
                            </div>
                        </div>

                        {/* Hover Border Effect */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-300" />
                    </Link>
                ))}
            </div>

            {/* Featured Brands Section */}
            <div className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-6 mb-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Featured Brands</span>
                    <div className="h-px bg-slate-200 dark:border-slate-800 flex-1"></div>
                </div>
                <div className="flex justify-between items-center gap-12 overflow-x-auto hide-scrollbar pb-6 grayscale opacity-60 hover:opacity-100 transition-opacity">
                    {['Fender', 'Moog', 'Neumann', 'Roland', 'Focusrite', 'Yamaha', 'Ableton', 'Universal Audio'].map(brand => (
                        <div key={brand} className="text-lg font-black tracking-tighter whitespace-nowrap cursor-pointer hover:text-primary transition-colors">
                            {brand}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;
