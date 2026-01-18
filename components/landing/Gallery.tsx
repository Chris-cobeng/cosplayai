"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const categories = ["All", "Sci-Fi", "Fantasy", "Anime", "Vintage", "History"];

const items = [
    {
        id: 1,
        title: "Cyberpunk Edge",
        category: "Sci-Fi",
        size: "col-span-1 md:col-span-2 row-span-2",
        img: "https://images.unsplash.com/photo-1614726365723-49cfaae488b7?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Elven Princess",
        category: "Fantasy",
        size: "col-span-1",
        img: "https://images.unsplash.com/photo-1515594297368-80e9273c5005?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Space Ranger",
        category: "Sci-Fi",
        size: "col-span-1",
        img: "https://images.unsplash.com/photo-1601332069884-36a86e1adeb5?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Noir Detective",
        category: "Vintage",
        size: "col-span-1 row-span-2",
        img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Anime Warrior",
        category: "Anime",
        size: "col-span-1",
        img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Medieval King",
        category: "History",
        size: "col-span-1",
        img: "https://images.unsplash.com/photo-1595166668733-40e94f1f2516?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 7,
        title: "Mystic Sorcerer",
        category: "Fantasy",
        size: "col-span-1",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    }
];

export function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredItems = selectedCategory === "All"
        ? items
        : items.filter(item => item.category === selectedCategory);

    return (
        <section className="py-24 bg-[#0A0A0F] relative overflow-hidden" id="gallery">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[128px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
                            Gallery Showcase
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                        Unlimited <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">Possibilities</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        Explore our vast library of styles or create your own. From anime favorites to photorealistic historical figures.
                    </p>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {categories.map((cat, i) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                        ? "bg-white text-black scale-105"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]" // Reduced height slightly
                >
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className={`relative group rounded-3xl overflow-hidden cursor-pointer bg-gray-900 border border-white/5 ${selectedCategory === "All" ? item.size : "col-span-1 md:col-span-1 row-span-1"}`}
                            >
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="transform origin-bottom-left transition-all duration-300">
                                        <div className="flex items-center justify-between mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                            <span className="inline-block px-2 py-1 bg-violet-500/80 backdrop-blur-md rounded-md text-[10px] uppercase font-bold text-white tracking-wider">
                                                {item.category}
                                            </span>
                                            <div className="bg-white/20 p-1.5 rounded-full backdrop-blur-md">
                                                <ArrowUpRight className="w-4 h-4 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{item.title}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-12 text-center">
                    <button className="px-8 py-3 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all duration-300 font-medium group">
                        View All Styles <span className="inline-block transition-transform group-hover:translate-x-1 ml-1">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
