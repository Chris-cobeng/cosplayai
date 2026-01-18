"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-900 via-purple-900 to-pink-900 opacity-50" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

            {/* Animated Particles/Orbs */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[128px]"
            />
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/30 rounded-full blur-[128px]"
            />

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-white">Limited Time Offer</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white">
                        Ready to Transform?
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
                        Join thousands of cosplayers creating stunning photos with AI today.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button className="h-16 px-10 text-xl rounded-full bg-white text-violet-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl font-bold">
                            Start Free Trial <ArrowRight className="ml-2 w-6 h-6" />
                        </Button>
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-8 text-sm text-gray-300">
                        <div>✓ No credit card required</div>
                        <div>✓ Cancel anytime</div>
                        <div>✓ 3 Free generations</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
