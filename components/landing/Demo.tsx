"use client";

import { motion } from "framer-motion";
import { Upload, ChevronRight, Download, Share2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Demo() {
    return (
        <section className="py-24 bg-[#050508] relative overflow-hidden">
            {/* Background blobs for depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">See The Magic In Action</h2>
                    <p className="text-gray-400">Experience the interface designed for speed and creativity.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-xl border border-white/10 bg-[#0A0A0F] shadow-2xl overflow-hidden max-w-5xl mx-auto ring-1 ring-white/5"
                >
                    {/* Browser Toolbar */}
                    <div className="h-12 bg-[#12121A] border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20" />
                        </div>
                        <div className="flex-1 text-center text-xs text-gray-500 font-mono">cosplayai.app/studio</div>
                    </div>

                    {/* App Interface */}
                    <div className="flex flex-col md:flex-row h-[600px]">
                        {/* Sidebar / Upload */}
                        <div className="w-full md:w-80 border-r border-white/5 p-6 bg-[#0E0E14] flex flex-col gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Input Image</label>
                                <div className="aspect-square rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center gap-2 hover:border-violet-500/50 hover:bg-violet-500/5 transition-colors cursor-pointer group">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-violet-500 group-hover:text-white transition-colors">
                                        <Upload className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                    </div>
                                    <span className="text-sm text-gray-500">Upload Selfie</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Settings</label>
                                <div className="space-y-3">
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-2/3 bg-violet-600 rounded-full" />
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Creativity</span>
                                        <span>High</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {['Portrait', 'Full Body', 'Cinematic'].map(mode => (
                                        <div key={mode} className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-400 cursor-pointer hover:bg-white/5 hover:border-white/20">
                                            {mode}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button className="mt-auto w-full bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white shadow-lg shadow-violet-900/20">
                                Generate Cosplay
                            </Button>
                        </div>

                        {/* Main Canvas */}
                        <div className="flex-1 bg-[#0A0A0F] p-8 relative flex items-center justify-center">
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                            <div className="relative z-10 w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                                {/* Simulated Result Image */}
                                <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop"
                                    alt="Demo Result"
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-white font-bold">Cyber Samurai</h3>
                                            <p className="text-xs text-gray-400">Generated in 12s</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                                                <Download className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Style Selector */}
                        <div className="w-full md:w-64 border-l border-white/5 bg-[#0E0E14] p-6 flex flex-col">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Choose Style</label>
                            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-2 custom-scrollbar">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="aspect-square rounded-lg bg-gray-800 border border-white/5 hover:border-violet-500 cursor-pointer transition-all hover:scale-105 relative overflow-hidden group">
                                        <div className={`absolute inset-0 bg-gradient-to-br opacity-50 ${i === 1 ? 'from-violet-500 to-pink-500 opacity-80' : 'from-gray-700 to-gray-600'}`} />
                                        {i === 1 && <div className="absolute inset-0 ring-2 ring-violet-500 rounded-lg" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
