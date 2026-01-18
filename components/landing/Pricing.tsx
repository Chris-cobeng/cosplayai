"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
    {
        name: "Free Trial",
        price: "$0",
        features: ["3 transformations", "Basic styles", "Standard quality", "Watermarked results"],
        cta: "Start Free",
        popular: false,
    },
    {
        name: "Pro",
        price: "$19.99",
        period: "/month",
        features: ["100 transformations", "Full style library", "Studio quality", "No watermarks", "Commercial rights"],
        cta: "Start Pro Trial",
        popular: true,
    },
    {
        name: "Ultimate",
        price: "$49.99",
        period: "/month",
        features: ["Unlimited transformations", "Custom AI training", "Priority support", "API access", "White-label option"],
        cta: "Go Ultimate",
        popular: false,
    },
];

export function Pricing() {
    return (
        <section className="py-24 relative" id="pricing">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Plan</h2>
                    <p className="text-gray-400">Unlock your full creative potential</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 ${plan.popular
                                    ? "bg-white/[0.03] border-violet-500/50 shadow-2xl shadow-violet-500/10 scale-105 z-10"
                                    : "bg-white/[0.01] border-white/5 hover:border-white/10"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-white">{plan.price}</span>
                                {plan.period && <span className="text-gray-400">{plan.period}</span>}
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, f) => (
                                    <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-violet-500/20 text-violet-300" : "bg-white/5 text-gray-400"}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full h-12 rounded-xl font-semibold text-base transition-all duration-300 ${plan.popular
                                        ? "bg-gradient-to-r from-violet-600 to-pink-500 hover:scale-105 shadow-lg shadow-violet-900/20 border-0"
                                        : "bg-white/5 hover:bg-white/10 text-white border-0"
                                    }`}
                            >
                                {plan.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12 text-gray-500 text-sm">
                    All plans include a 14-day money-back guarantee. No questions asked.
                </div>
            </div>
        </section>
    );
}
