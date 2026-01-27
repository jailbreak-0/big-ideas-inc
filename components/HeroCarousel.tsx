"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface CarouselSlide {
    id: string;
    title: string;
    description: string;
    image: string;
    badge: string;
    ctaText: string;
    ctaLink: string;
}

const slides: CarouselSlide[] = [
    {
        id: '1',
        title: 'The Future of Synthesis.',
        description: 'Experience the legendary Prophet-10 Rev 4. Hand-built analog warmth redesigned for the modern professional studio.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAE8p0SvHmkin-p80Jji4-3NsMLX7zzeySSwR33Atp2H6OSh574HXyVzypkqrBP9qZKnN1hVnDvzzO0ApBkUYqN2l_m_QCFB8kXeDKem6bIK6kCiiUjJSG-bzeft3CpxRG2rT_ckpq6NebCyN59jla8_Zxi9T6dFxCpo83o1Ic-CQqvILhXja2y0CBoCbiaszMw2wunWLPbKDOqJJwK10s774r_jBqv9HBICXsqdnRUlDpcbo1xVcoG55miatzbXO5ASRoX0ENTqaE1',
        badge: 'New Release',
        ctaText: 'Shop Prophet-10',
        ctaLink: '/catalog',
    },
    {
        id: '2',
        title: 'Studio-Grade Precision.',
        description: 'Neumann KH 150 monitors deliver uncompromising accuracy. Bi-amplified design with advanced DSP for your critical listening needs.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC__89zTWgo7jrFLvCmdO52ks-IpLTZcsU354YO0yvBtyeARVvKrSq8cUoH6i4NLs2kB34O0ULzB4bm7fjpTiJhW6XUMj1-xtaXNH8O8KeXctlRntzNqxcCwjKG7FrAdp_YAWaeRYs2ywgM5uoGvGvilaIrLN09xeIOYLrcQpOxhpeZAOia7bn0kfXehGlOPjZ3JmAyoOYyxdWbnVrqmszhAhoj8gSMWP5qzB1J7TWNakK1zqNgpckQRuY077zQORZNTnpIUq3xHtA3',
        badge: 'Hot Deal',
        ctaText: 'Explore Monitors',
        ctaLink: '/catalog',
    },
    {
        id: '3',
        title: 'Iconic Sound, Modern Power.',
        description: 'The Fender American Professional II Stratocaster. Timeless tone with V-Mod II pickups and enhanced playability for the modern guitarist.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbil7qwiBxoJh8mFMG2UEv0Ib_MmNauxUc3bcnnblKy9M8JPE8qXMcwxoFVFAVDR4YzFNMYOCo7T6wwEn9x2oFgXV_ZfrNlE1xmGZuvarKOJZonaUzkmRVhKYYpFENzaUA33RZgbEcYhZ2gKvLA226E65yasmR30HYfLfzV5wAl5wMpcSeJ5LQNmSzh4ZUwBRxq8ItYhIs8bWvCRMdCluJt7bW_HL41W85wtwL-V7uvG_CrSoU8qNpk-0yFiYjFfrPHYtex9eVgNsk',
        badge: 'Best Seller',
        ctaText: 'Shop Guitars',
        ctaLink: '/catalog',
    },
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // Resume autoplay after 10 seconds
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#0c1d1d] aspect-4/3 sm:aspect-video lg:aspect-21/9">
            {/* Slides */}
            <div className="relative h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-50 sm:opacity-70"
                            style={{ backgroundImage: `url('${slide.image}')` }}
                        />
                        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 sm:via-black/40 to-transparent"></div>
                        <div className="relative z-10 h-full flex items-center">
                            <div className="w-full max-w-2xl px-6 sm:px-8 lg:px-12 xl:px-20 space-y-3 sm:space-y-4 lg:space-y-6">
                                <span className="inline-block bg-primary px-2 sm:px-3 py-1 rounded text-[9px] sm:text-[10px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white">
                                    {slide.badge}
                                </span>
                                <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-none tracking-tighter">
                                    {slide.title}
                                </h2>
                                <p className="text-white/80 text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed font-light">
                                    {slide.description}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                                    <Link
                                        href={slide.ctaLink}
                                        className="bg-primary hover:bg-primary/90 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all transform hover:-translate-y-1 text-center text-sm sm:text-base"
                                    >
                                        {slide.ctaText}
                                    </Link>
                                    <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-white/20 transition-all text-sm sm:text-base">
                                        Watch Demo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 sm:p-3 rounded-full border border-white/20 transition-all"
                aria-label="Previous slide"
            >
                <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_left</span>
            </button>
            <button
                onClick={nextSlide}
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 sm:p-3 rounded-full border border-white/20 transition-all"
                aria-label="Next slide"
            >
                <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_right</span>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 sm:h-2 rounded-full transition-all ${
                            index === currentSlide
                                ? 'w-8 sm:w-12 bg-white'
                                : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
