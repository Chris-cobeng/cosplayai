"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        q: "How does the AI work?",
        a: "Our advanced AI analyzes your facial features from your uploaded photo and maps them onto our high-resolution character models, adjusting lighting, skin tone, and perspective for a seamless blend."
    },
    {
        q: "What photo should I upload for best results?",
        a: "Clear, front-facing selfies work best. Avoid heavy accessories, extreme angles, or blurry photos. Good lighting helps the AI capture your likeness accurately."
    },
    {
        q: "Can I use these images commercially?",
        a: "Yes! With our Pro and Ultimate plans, you own full commercial rights to all generated images. You can use them for social media, merchandise, or portfolios."
    },
    {
        q: "How long does it take to generate?",
        a: "Most generations are completed in under 60 seconds. Complex scenes or high-resolution upscaling may take slightly longer."
    },
    {
        q: "Can I upload my own costume designs?",
        a: "Absolutely. Use the 'Custom Style' feature to upload any reference image, drawing, or photo, and our AI will apply that style to your portrait."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24" id="faq">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="border border-white/5 rounded-2xl bg-white/[0.02] overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="flex items-center justify-between w-full p-6 text-left hover:bg-white/[0.02] transition-colors"
                            >
                                <span className="font-semibold text-lg pr-8">{faq.q}</span>
                                <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${openIndex === i ? "rotate-45" : ""}`}>
                                    <Plus className="w-4 h-4" />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
