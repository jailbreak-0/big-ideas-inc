"use client";

import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 py-12 lg:py-20">
            <div className="mb-16 border-l-4 border-primary pl-6">
                <h2 className="text-5xl font-black tracking-tighter mb-4 leading-none">Contact Our Team</h2>
                <p className="text-lg text-[#45a1a1] font-medium max-w-2xl">We're committed to your musical excellence. Reach out with any questions about our instruments, orders, or upcoming workshops.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 bg-white dark:bg-[#2c313c] p-8 lg:p-12 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">mail</span>
                        Send us a message
                    </h3>
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-[#45a1a1]">Full Name</label>
                                <input className="w-full bg-slate-50 rounded-xl border-none p-4" placeholder="Enter your name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-[#45a1a1]">Email</label>
                                <input className="w-full bg-slate-50 rounded-xl border-none p-4" placeholder="name@example.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold uppercase tracking-wider text-[#45a1a1]">Message</label>
                            <textarea className="w-full bg-slate-50 rounded-xl border-none p-4 min-h-[150px]" placeholder="How can we help?" />
                        </div>
                        <button className="bg-primary text-white px-12 py-4 rounded-xl font-extrabold shadow-lg">Send Message</button>
                    </form>
                </div>

                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-primary text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-2xl font-bold mb-4">Live Chat</h4>
                            <p className="opacity-80 mb-6 font-medium">Get instant answers from our specialists.</p>
                            <button className="bg-white text-primary px-6 py-2 rounded-lg font-bold text-sm">Start Chat</button>
                        </div>
                        <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-white/10 text-[200px]">forum</span>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary"><span className="material-symbols-outlined">call</span></div>
                            <div><p className="text-xs font-bold text-[#45a1a1] uppercase">Phone</p><p className="font-bold">1-800-BIG-IDEA</p></div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary"><span className="material-symbols-outlined">alternate_email</span></div>
                            <div><p className="text-xs font-bold text-[#45a1a1] uppercase">Email</p><p className="font-bold">hello@proaudiogear.com</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
