"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const items = [
    {
        id: 1,
        title: "Cyberpunk Edge",
        category: "Sci-Fi",
        size: "md:col-span-2 md:row-span-2",
        img: "https://images.unsplash.com/photo-1614726365723-49cfaae488b7?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Elven Princess",
        category: "Fantasy",
        size: "md:col-span-1 md:row-span-1",
        img: "https://images.unsplash.com/photo-1515594297368-80e9273c5005?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Space Ranger",
        category: "Sci-Fi",
        size: "md:col-span-1 md:row-span-1",
        img: "https://images.unsplash.com/photo-1601332069884-36a86e1adeb5?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Noir Detective",
        category: "Vintage",
        size: "md:col-span-1 md:row-span-2",
        img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Anime Warrior",
        category: "Anime",
        size: "md:col-span-1 md:row-span-1",
        img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Medieval King",
        category: "History",
        size: "md:col-span-1 md:row-span-1",
        img: "https://images.unsplash.com/photo-1595166668733-40e94f1f2516?q=80&w=800&auto=format&fit=crop",
    },
];

export function Gallery() {
    return (
        <section className="py-24 bg-black/50" id="gallery">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Unlimited <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">Possibilities</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From anime favorites to historical figures, transform into anyone or anything.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-4 auto-rows-[300px]">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative group rounded-3xl overflow-hidden cursor-pointer ${item.size} border border-white/5 bg-gray-900`}
                        >
                            {/* Image would ideally use Next/Image but we need domain config, using img for safety in this demo environment */}
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                <ArrowUpRight className="w-5 h-5 text-white" />
                            </div>

                            <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2 block">{item.category}</span>
                                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
