"use client";

import { motion } from "framer-motion";

const users = [
    { name: "Sarah L.", role: "became Sailor Moon", time: "5m ago" },
    { name: "Mike T.", role: "became Iron Man", time: "12m ago" },
    { name: "Jessica K.", role: "became Wonder Woman", time: "24m ago" },
    { name: "David R.", role: "became Geralt", time: "1h ago" },
    { name: "Alex P.", role: "became Spiderman", time: "3m ago" },
    { name: "Emily W.", role: "became Ahri", time: "15m ago" },
    { name: "Chris M.", role: "became Master Chief", time: "42m ago" },
];

export function SocialProof() {
    return (
        <section className="py-10 border-y border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="flex relative">
                <motion.div
                    className="flex gap-12 whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                    }}
                >
                    {[...users, ...users, ...users].map((user, i) => (
                        <div key={i} className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                                {user.name[0]}
                            </div>
                            <div>
                                <span className="font-semibold text-gray-300">{user.name}</span>
                                <span className="mx-2 text-gray-600">•</span>
                                <span className="text-violet-400">{user.role}</span>
                                <span className="mx-2 text-gray-600">•</span>
                                <span className="text-xs text-gray-500">{user.time}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Gradients to hide edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0A0F] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0A0F] to-transparent z-10" />
            </div>
        </section>
    );
}
