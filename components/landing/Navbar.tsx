"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button"; // Access from shadcn if available, or I'll just style native buttons if simpler, but I should try to reuse.
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setIsScrolled(latest > 50);
        });
        return () => unsubscribe();
    }, [scrollY]);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-[#0A0A0F]/80 backdrop-blur-md border-b border-white/10"
                    : "bg-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-violet-600 to-pink-500 rounded-lg overflow-hidden">
                        <span className="text-white font-bold text-xl">C</span>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        CosplayAI
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {["Features", "Gallery", "Pricing", "Blog"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                        Sign In
                    </Link>
                    <button className="relative px-6 py-2.5 rounded-full font-medium text-white text-sm group overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-500 transition-all duration-300 group-hover:scale-105" />
                        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative flex items-center gap-2">
                            Start Free Trial
                        </span>
                        <div className="absolute inset-0 -z-10 blur-lg bg-violet-600/50 opacity-0 group-hover:opacity-50 transition-opacity" />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-20 left-0 right-0 bg-[#0A0A0F] border-b border-white/10 p-6 flex flex-col gap-6"
                >
                    {["Features", "Gallery", "Pricing", "Blog"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-lg font-medium text-gray-300 hover:text-white"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <div className="h-px bg-white/10" />
                    <Link
                        href="/login"
                        className="text-lg font-medium text-gray-300 hover:text-white"
                    >
                        Sign In
                    </Link>
                    <button className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-violet-600 to-pink-500">
                        Start Free Trial
                    </button>
                </motion.div>
            )}
        </motion.nav>
    );
}
