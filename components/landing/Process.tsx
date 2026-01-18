"use client";

import { motion } from "framer-motion";
import { UploadCloud, Wand2, Download, Check } from "lucide-react";

const steps = [
    {
        icon: UploadCloud,
        title: "Upload Your Photo",
        desc: "Any selfie or portrait works perfectly. Drag & drop supported.",
        color: "from-blue-400 to-cyan-400",
        visual: (
            <div className="w-full h-full bg-gray-800/50 rounded-lg border border-dashed border-gray-600 flex flex-col items-center justify-center p-4">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-2">
                    <UploadCloud className="w-6 h-6 text-gray-400" />
                </div>
                <div className="w-2/3 h-2 bg-gray-700 rounded-full" />
            </div>
        )
    },
    {
        icon: Wand2,
        title: "Choose Character",
        desc: "Browse 10,000+ styles or upload your own reference.",
        color: "from-violet-400 to-pink-400",
        visual: (
            <div className="grid grid-cols-2 gap-2 w-full h-full p-2">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-gray-800 rounded-md overflow-hidden relative">
                        <div className={`absolute inset-0 bg-gradient-to-br opacity-50 ${i === 2 ? 'from-violet-500 to-pink-500' : 'from-gray-700 to-gray-600'}`} />
                        {i === 2 && <div className="absolute inset-0 ring-2 ring-violet-500" />}
                    </div>
                ))}
            </div>
        )
    },
    {
        icon: Download,
        title: "Get Studio Results",
        desc: "Professional quality AI generation in under 60 seconds.",
        color: "from-amber-400 to-orange-400",
        visual: (
            <div className="w-full h-full bg-gray-800 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-blue-600 opacity-80" />
                <div className="absolute bottom-3 right-3 bg-green-500 text-white p-1 rounded-full shadow-lg">
                    <Check className="w-4 h-4" />
                </div>
            </div>
        )
    }
];

export function Process() {
    return (
        <section className="py-24 relative overflow-hidden" id="features">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        From Selfie to Cosplay in <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Three Steps</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Our AI analyzes your facial features and perfectly blends them with any character style you choose.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-violet-500/20 hover:to-cyan-500/20 transition-colors duration-500 group"
                        >
                            <div className="absolute inset-0 bg-[#0A0A0F] rounded-3xl m-[1px]" />
                            <div className="relative p-8 h-full flex flex-col z-10">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="w-full h-full bg-black/40 backdrop-blur-sm rounded-[14px] flex items-center justify-center">
                                        <step.icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                                <p className="text-gray-400 mb-8">{step.desc}</p>

                                <div className="mt-auto h-40 rounded-xl bg-black/20 border border-white/5 overflow-hidden group-hover:border-white/10 transition-colors">
                                    {step.visual}
                                </div>

                                {/* Number Badge */}
                                <div className="absolute top-4 right-4 text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors pointer-events-none select-none">
                                    {index + 1}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
