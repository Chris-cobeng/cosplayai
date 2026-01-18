"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Zap, Heart, ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
                            AI-Powered Cosplay Transformation
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                        Transform Into <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 animate-gradient-x">
                            Any Character
                        </span>{" "}
                        <br />
                        In Seconds
                    </h1>

                    <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                        Professional studio-quality cosplay photos powered by AI. No
                        costume, no photoshoot, no limits. Just your photo and imagination.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            size="lg"
                            className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-violet-600 to-pink-500 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.5)] border-0"
                        >
                            Create Your First Cosplay <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="lg"
                            className="h-14 px-8 text-lg rounded-full border border-white/10 hover:bg-white/5 hover:text-white transition-all text-gray-300"
                        >
                            <Play className="mr-2 w-5 h-5 fill-current" /> Watch Demo
                        </Button>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500 pt-4">
                        <div className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-violet-400" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Zap className="w-4 h-4 text-amber-400" />
                            <span>Results in 60 seconds</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Heart className="w-4 h-4 text-pink-400" />
                            <span>Join 50,000+ cosplayers</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    {/* Main Transformation Card */}
                    <div className="relative z-10 bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl">
                        {/* This would be the interactive slider in a real app, simplified for now */}
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-gray-800">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-black/40 z-10" />
                            {/* Placeholder for "After" image */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614726365723-49cfaae488b7?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-90 mix-blend-overlay" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white/20 font-bold text-4xl uppercase tracking-widest rotate-[-15deg]">Cosplay AI Results</span>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-xs font-medium z-20">
                                ✨ Cyberpunk 2077 Style
                            </div>
                        </div>
                    </div>

                    {/* Floating Orbiting Elements */}


                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-8 -left-8 z-20 bg-gray-800/80 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-xl"
                    >
                        <div className="flex gap-2 items-center text-white text-xs p-2">
                            <span className="bg-green-500 w-2 h-2 rounded-full" /> Processing Complete
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
