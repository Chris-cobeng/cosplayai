"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle } from "lucide-react";

const testimonials = [
    {
        name: "Jessica Chen",
        role: "Prop Maker & Cosplayer",
        content: "This saved me thousands on photoshoots. The quality is indistinguishable from real studio photos. My Instagram engagement went through the roof!",
        stars: 5,
        avatar: "JC"
    },
    {
        name: "Marcus Rivera",
        role: "Content Creator",
        content: "I create cosplay content weekly and this tool is a game-changer. I can test character ideas before investing in real costumes.",
        stars: 5,
        avatar: "MR"
    },
    {
        name: "Aiko Tanaka",
        role: "Convention Regular",
        content: "The custom upload feature is incredible. I uploaded my own costume design and the AI nailed it perfectly. Absolutely worth every penny.",
        stars: 5,
        avatar: "AT"
    }
];

export function Testimonials() {
    return (
        <section className="py-24 relative overflow-hidden" id="testimonials">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Loved By Cosplayers Worldwide</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(t.stars)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <blockquote className="text-lg text-gray-300 mb-6 leading-relaxed">
                                "{t.content}"
                            </blockquote>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 p-[1px]">
                                    <div className="w-full h-full rounded-full bg-[#1A1A2E] flex items-center justify-center font-bold text-white">
                                        {t.avatar}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-white">{t.name}</h4>
                                        <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                                    </div>
                                    <p className="text-sm text-gray-400">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-white/5 bg-white/[0.01]">
                    {[
                        { label: "Happy Cosplayers", value: "50,000+" },
                        { label: "Images Generated", value: "2M+" },
                        { label: "Avg Rating", value: "4.9/5" },
                        { label: "Styles Available", value: "10k+" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
