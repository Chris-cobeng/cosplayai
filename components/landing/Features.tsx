"use client";

import { motion } from "framer-motion";
import { Camera, Image as ImageIcon, Upload, Zap, Layers, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: Camera,
        title: "Studio-Quality AI",
        desc: "Professional photography-grade results with perfect lighting, shadows, and details.",
        gradient: "from-pink-500 to-rose-500"
    },
    {
        icon: ImageIcon,
        title: "Massive Costume Library",
        desc: "10,000+ pre-made styles from anime, games, movies, and comics. Updated weekly.",
        gradient: "from-violet-500 to-indigo-500"
    },
    {
        icon: Upload,
        title: "Custom Style Upload",
        desc: "Upload any reference image and our AI will recreate that exact cosplay look.",
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        desc: "Get your transformation in under 60 seconds. No waiting, no rendering delays.",
        gradient: "from-amber-400 to-orange-500"
    },
    {
        icon: Layers,
        title: "Multiple Variations",
        desc: "Generate multiple poses, angles, and backgrounds from a single upload.",
        gradient: "from-emerald-400 to-green-500"
    },
    {
        icon: ShieldCheck,
        title: "Commercial Rights",
        desc: "Full rights to use images for social media, portfolios, prints, and commissions.",
        gradient: "from-fuchsia-500 to-pink-500"
    }
];

export function Features() {
    return (
        <section className="py-24 relative" id="features-grid">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-violet-900/5 to-[#0A0A0F]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Everything You Need to Create <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Perfect Cosplay Photos</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform`}>
                                <div className="w-full h-full bg-[#0A0A0F] rounded-[14px] flex items-center justify-center">
                                    <feature.icon className={`w-7 h-7 text-white`} />
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
