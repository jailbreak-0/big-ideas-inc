"use client";

import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="space-y-20">
            <section className="max-w-[1200px] mx-auto px-6 pt-10 grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">Est. 1994</span>
                        <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">Sounding the <span className="text-primary">Impossible.</span></h1>
                        <p className="text-lg text-[#45a1a1] leading-relaxed">At Big Ideas Inc., we curate the tools that define generations. From analog purists to digital pioneers.</p>
                    </div>
                    <div className="space-y-6 leading-loose">
                        <p>Our mission has remained unchanged: providing world-class professional music equipment to those who dare to dream bigger.</p>
                        <p>Our team consists of engineers and musicians who understand that every knob turn is part of a larger story.</p>
                    </div>
                    <div className="flex gap-12">
                        <div><div className="text-3xl font-bold">250+</div><div className="text-xs uppercase text-[#45a1a1]">Global Brands</div></div>
                        <div><div className="text-3xl font-bold">12k</div><div className="text-xs uppercase text-[#45a1a1]">Studios Outfitted</div></div>
                    </div>
                </div>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfxLwcmweg4rPPYNYWcURO-x3sKCR9QQZufyA_drMiDM73sgpuICkfL25XhCVDOjy5UjdYVFH5DiqrieBAQJsZZE0V8TbW-kFFosyTW6yQocESYXzoKnWlIL1H0z3nQghNdHHdG9Ag-uRISw22htI0fZiHdU1NG-YE7yTFWHAFmGuMlIdW4XbBlJS_myOSc8Ws3fw1yCZiIhj7Crl1CkRsdpgWzMfwsNs6jLhki5sgnGMQURy2Pmtm8mDfFxA7OK0GmcZ2IutSEfsC"
                        alt="Studio"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            <section className="bg-white py-20 border-y">
                <div className="max-w-[1200px] mx-auto px-6 text-center space-y-10">
                    <h2 className="text-4xl font-extrabold">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto space-y-4 text-left">
                        {[
                            "What is your standard shipping timeline?",
                            "Do you offer international shipping?",
                            "What is your return policy for open-box items?",
                            "How do I access technical setup guides?"
                        ].map(q => (
                            <div key={q} className="p-6 border rounded-xl hover:shadow-md transition-all cursor-pointer flex justify-between items-center group">
                                <span className="font-bold">{q}</span>
                                <span className="material-symbols-outlined text-primary group-hover:rotate-180 transition-transform">expand_more</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
