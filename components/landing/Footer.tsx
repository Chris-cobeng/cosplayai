"use client";

import Link from "next/link";
import { Twitter, Instagram, Youtube, Github, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="pt-20 pb-10 bg-[#050508] border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-pink-500 flex items-center justify-center text-white font-bold">C</div>
                            <span className="text-xl font-bold text-white">CosplayAI</span>
                        </Link>
                        <p className="text-gray-400">
                            AI-Powered Cosplay Photography. Transform your photos into studio-quality character art in seconds.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Youtube, Github].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-gray-400">
                            {['Features', 'Pricing', 'Gallery', 'API', 'Showcase'].map(item => (
                                <li key={item}><Link href="#" className="hover:text-violet-400 transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Resources</h4>
                        <ul className="space-y-4 text-gray-400">
                            {['Community', 'Help Center', 'Blog', 'Tutorials', 'Cosplay Guide'].map(item => (
                                <li key={item}><Link href="#" className="hover:text-violet-400 transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Stay Updated</h4>
                        <p className="text-gray-400 mb-4">Get the latest styles and features.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 w-full"
                            />
                            <button className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg px-4 transition-colors">
                                <Mail className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div>© {new Date().getFullYear()} CosplayAI Inc. All rights reserved.</div>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Service</Link>
                        <Link href="#" className="hover:text-white">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
