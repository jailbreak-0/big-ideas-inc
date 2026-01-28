"use client";

import React, { useState, useMemo } from 'react';

interface FAQ {
    id: number;
    question: string;
    answer: string;
    category: string;
}

const faqData: FAQ[] = [
    {
        id: 1,
        question: "What is your standard shipping timeline?",
        answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping (1-2 business days) and overnight options are also available at checkout. We ship Monday through Friday, excluding holidays. Orders placed after 2 PM EST will be processed the next business day.",
        category: "Shipping"
    },
    {
        id: 2,
        question: "Do you offer international shipping?",
        answer: "Yes! We ship to over 150 countries worldwide. International shipping times vary by destination, typically 7-21 business days. All customs duties and taxes are the responsibility of the buyer. We provide full tracking for all international orders.",
        category: "Shipping"
    },
    {
        id: 3,
        question: "What is your return policy for open-box items?",
        answer: "Open-box items can be returned within 30 days of purchase for a full refund, provided they're in like-new condition with all original packaging and accessories. The item must show no signs of use or wear. Return shipping costs are covered by us if the item is defective, otherwise the customer is responsible.",
        category: "Returns"
    },
    {
        id: 4,
        question: "How do I access technical setup guides?",
        answer: "Technical setup guides are available on each product page under the 'Documentation' tab. You can also find comprehensive guides in your account dashboard under 'My Products' after purchase. For video tutorials, visit our YouTube channel or contact our technical support team.",
        category: "Support"
    },
    {
        id: 5,
        question: "Do you offer price matching?",
        answer: "Yes, we offer price matching on identical products from authorized dealers. The item must be in stock at both retailers, and the competitor's price must be verifiable online. Contact our sales team with the product details and competitor link within 7 days of your purchase.",
        category: "Pricing"
    },
    {
        id: 6,
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and wire transfers for orders over $5,000. We also offer financing options through Affirm and Klarna for qualified purchases.",
        category: "Payment"
    },
    {
        id: 7,
        question: "Is there a warranty on products?",
        answer: "All new products come with the manufacturer's warranty, typically 1-3 years depending on the brand. We also offer extended warranty protection plans for an additional cost. Warranty details are listed on each product page and included in your order confirmation.",
        category: "Warranty"
    },
    {
        id: 8,
        question: "Can I cancel or modify my order?",
        answer: "Orders can be cancelled or modified within 1 hour of placement by contacting customer service immediately. Once an order enters processing or shipping, it cannot be cancelled but can be returned following our standard return policy.",
        category: "Orders"
    },
    {
        id: 9,
        question: "Do you have a showroom I can visit?",
        answer: "Yes! Our flagship showroom is located in Los Angeles, CA. We're open Monday-Saturday, 10 AM - 6 PM. Private demonstrations can be scheduled by appointment. Please call ahead to ensure specific products are available for testing.",
        category: "Store"
    },
    {
        id: 10,
        question: "How do I track my order?",
        answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing order history. Tracking updates typically appear within 24 hours of shipment.",
        category: "Shipping"
    },
    {
        id: 11,
        question: "What if an item arrives damaged?",
        answer: "If your item arrives damaged, please contact us within 48 hours with photos of the damage and packaging. We'll arrange for a replacement or full refund immediately. Keep all packaging materials until the issue is resolved. We cover all return shipping for damaged items.",
        category: "Returns"
    },
    {
        id: 12,
        question: "Do you offer bulk or educational discounts?",
        answer: "Yes! We offer special pricing for educational institutions, houses of worship, and bulk purchases. Contact our B2B sales team with your tax-exempt certificate or purchase order for a custom quote. Discounts typically range from 10-30% depending on order size.",
        category: "Pricing"
    },
    {
        id: 13,
        question: "How can I contact customer support?",
        answer: "Our support team is available via phone (1-800-BIGIDEAS), email (support@bigideasinc.com), or live chat on our website. Hours are Monday-Friday 9 AM - 8 PM EST, Saturday 10 AM - 6 PM EST. Average response time is under 2 hours.",
        category: "Support"
    },
    {
        id: 14,
        question: "Are your products authentic?",
        answer: "Absolutely. We are authorized dealers for every brand we carry and source all products directly from manufacturers or their official distributors. Every product comes with original packaging, documentation, and full manufacturer warranty. We never sell counterfeit or gray-market goods.",
        category: "Products"
    },
    {
        id: 15,
        question: "Do you buy used equipment?",
        answer: "Yes, we have a trade-in program for used professional audio equipment. Submit photos and details through our trade-in form, and we'll provide a quote within 24 hours. Trade-in credit can be applied to new purchases or paid out via check or PayPal.",
        category: "Trade-In"
    }
];

const AboutPage: React.FC = () => {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Get unique categories
    const categories = useMemo(() => {
        const cats = Array.from(new Set(faqData.map(faq => faq.category)));
        return ['All', ...cats.sort()];
    }, []);

    // Filter FAQs based on search and category
    const filteredFaqs = useMemo(() => {
        return faqData.filter(faq => {
            const matchesSearch = searchQuery === '' || 
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
    const paginatedFaqs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredFaqs.slice(startIndex, endIndex);
    }, [filteredFaqs, currentPage]);

    // Reset to page 1 when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    const toggleExpand = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
        setExpandedId(null); // Close any expanded FAQ when changing pages
        window.scrollTo({ top: 800, behavior: 'smooth' });
    };

    return (
        <div className="space-y-20">
            <section className="max-w-300 mx-auto px-6 pt-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">Est. 2025</span>
                        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">Sounding the <span className="text-primary">Impossible.</span></h1>
                        <p className="text-lg text-[#45a1a1] dark:text-[#5bc5c5] leading-relaxed">At Big Ideas Inc., we curate the tools that define generations. From analog purists to digital pioneers.</p>
                    </div>
                    <div className="space-y-6 leading-loose text-charcoal/80 dark:text-white/70">
                        <p>Our mission has remained unchanged: providing world-class professional music equipment to those who dare to dream bigger.</p>
                        <p>Our team consists of engineers and musicians who understand that every knob turn is part of a larger story.</p>
                    </div>
                    <div className="flex gap-12">
                        <div><div className="text-3xl font-bold dark:text-white">250+</div><div className="text-xs uppercase text-[#45a1a1]">Global Brands</div></div>
                        <div><div className="text-3xl font-bold dark:text-white">12k</div><div className="text-xs uppercase text-[#45a1a1]">Studios Outfitted</div></div>
                    </div>
                </div>
                <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfxLwcmweg4rPPYNYWcURO-x3sKCR9QQZufyA_drMiDM73sgpuICkfL25XhCVDOjy5UjdYVFH5DiqrieBAQJsZZE0V8TbW-kFFosyTW6yQocESYXzoKnWlIL1H0z3nQghNdHHdG9Ag-uRISw22htI0fZiHdU1NG-YE7yTFWHAFmGuMlIdW4XbBlJS_myOSc8Ws3fw1yCZiIhj7Crl1CkRsdpgWzMfwsNs6jLhki5sgnGMQURy2Pmtm8mDfFxA7OK0GmcZ2IutSEfsC"
                        alt="Studio"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            <section className="bg-white dark:bg-[#0a0a0a] py-20 border-y border-charcoal/10 dark:border-white/5">
                <div className="max-w-300 mx-auto px-6 space-y-10">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-extrabold text-primary">Frequently Asked Questions</h2>
                        <p className="text-charcoal/60 dark:text-white/50 max-w-2xl mx-auto">
                            Find answers to common questions about our products, shipping, returns, and more.
                        </p>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Search Bar */}
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-white/40">
                                search
                            </span>
                            <input
                                type="text"
                                placeholder="Search FAQs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-charcoal/5 dark:bg-white/5 border border-charcoal/10 dark:border-white/10 rounded-xl text-charcoal dark:text-white placeholder:text-charcoal/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal/40 dark:text-white/40 hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2 justify-center">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                        selectedCategory === category
                                            ? 'bg-primary text-white shadow-md'
                                            : 'bg-charcoal/5 dark:bg-white/5 text-charcoal/70 dark:text-white/60 hover:bg-charcoal/10 dark:hover:bg-white/10'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Results Count */}
                        <div className="text-center text-sm text-charcoal/50 dark:text-white/50">
                            {filteredFaqs.length === 0 ? (
                                <span>No FAQs found matching your criteria</span>
                            ) : (
                                <span>Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, filteredFaqs.length)} of {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}</span>
                            )}
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="max-w-4xl mx-auto space-y-4">
                        {filteredFaqs.length === 0 ? (
                            <div className="text-center py-12 space-y-4">
                                <span className="material-symbols-outlined text-6xl text-charcoal/20 dark:text-white/20">
                                    search_off
                                </span>
                                <p className="text-charcoal/60 dark:text-white/50">
                                    Try adjusting your search or filter to find what you're looking for.
                                </p>
                            </div>
                        ) : (
                            paginatedFaqs.map(faq => (
                                <div
                                    key={faq.id}
                                    className="border border-charcoal/10 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-white/5 hover:shadow-lg transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleExpand(faq.id)}
                                        className="w-full p-6 flex justify-between items-start gap-4 text-left group"
                                    >
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                    {faq.category}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-lg text-charcoal dark:text-white group-hover:text-primary transition-colors">
                                                {faq.question}
                                            </h3>
                                        </div>
                                        <span
                                            className={`material-symbols-outlined text-primary transition-transform duration-300 shrink-0 ${
                                                expandedId === faq.id ? 'rotate-180' : ''
                                            }`}
                                        >
                                            expand_more
                                        </span>
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            expandedId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <div className="px-6 pb-6 text-charcoal/70 dark:text-white/60 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {filteredFaqs.length > itemsPerPage && (
                        <div className="max-w-4xl mx-auto mt-8 flex items-center justify-center gap-2">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-charcoal/5 dark:bg-white/5 text-charcoal dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-charcoal/10 dark:hover:bg-white/10 transition-colors"
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            
                            <div className="flex items-center gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                                    // Show first page, last page, current page, and pages around current
                                    const showPage = 
                                        page === 1 || 
                                        page === totalPages || 
                                        (page >= currentPage - 1 && page <= currentPage + 1);
                                    
                                    const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                                    const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                                    return (
                                        <React.Fragment key={page}>
                                            {showEllipsisBefore && (
                                                <span className="px-2 text-charcoal/40 dark:text-white/40">...</span>
                                            )}
                                            {showPage && (
                                                <button
                                                    onClick={() => goToPage(page)}
                                                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                                        currentPage === page
                                                            ? 'bg-primary text-white shadow-md'
                                                            : 'bg-charcoal/5 dark:bg-white/5 text-charcoal dark:text-white hover:bg-charcoal/10 dark:hover:bg-white/10'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            )}
                                            {showEllipsisAfter && (
                                                <span className="px-2 text-charcoal/40 dark:text-white/40">...</span>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg bg-charcoal/5 dark:bg-white/5 text-charcoal dark:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-charcoal/10 dark:hover:bg-white/10 transition-colors"
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    )}

                    {/* Contact Support CTA */}
                    <div className="max-w-4xl mx-auto mt-16 p-8 bg-linear-to-r from-primary/10 to-[#45a1a1]/10 rounded-2xl border border-primary/20 text-center space-y-4">
                        <h3 className="text-2xl font-bold text-charcoal dark:text-white">
                            Still have questions?
                        </h3>
                        <p className="text-charcoal/60 dark:text-white/60">
                            Our support team is here to help you find the perfect solution.
                        </p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
                        >
                            Contact Support
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
