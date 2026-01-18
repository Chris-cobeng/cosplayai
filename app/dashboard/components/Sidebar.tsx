"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, Sparkles, X, Plus, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SidebarProps {
    onGenerate: (data: any) => void;
    isGenerating: boolean;
    customStyleImage: string | null;
    selectedStyle: number | string | null;
}

export default function Sidebar({ onGenerate, isGenerating, customStyleImage, selectedStyle }: SidebarProps) {
    const [dragActive, setDragActive] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState("");
    const [imageCount, setImageCount] = useState(2);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (uploadedImage) {
            URL.revokeObjectURL(uploadedImage);
        }
        const url = URL.createObjectURL(file);
        setUploadedImage(url);
    };

    const removeImage = () => {
        if (uploadedImage) {
            URL.revokeObjectURL(uploadedImage);
        }
        setUploadedImage(null);
    };

    // Cleanup blob URLs on unmount
    useEffect(() => {
        return () => {
            if (uploadedImage) {
                URL.revokeObjectURL(uploadedImage);
            }
        };
    }, [uploadedImage]);

    return (
        <div className="h-full flex flex-col relative text-zinc-100">
            {/* Scrollable Content */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain p-6 pb-28 space-y-8">
                {/* Upload Section */}
                <div className="space-y-4">
                    <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">
                        Upload Your Photo
                    </h2>

                    <AnimatePresence mode="wait">
                        {!uploadedImage ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={cn(
                                    "relative group flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out cursor-pointer overflow-hidden",
                                    dragActive
                                        ? "border-blue-500 bg-blue-500/10"
                                        : "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700"
                                )}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    onChange={handleChange}
                                    accept="image/png, image/jpeg, image/jpg"
                                />
                                <div className="flex flex-col items-center gap-4 text-center p-4">
                                    <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all duration-300">
                                        <Upload className="w-5 h-5 text-zinc-500 group-hover:text-blue-500 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-zinc-200">
                                            Click or drag photo
                                        </p>
                                        <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">
                                            JPG, PNG (Max 10MB)
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative w-full h-48 rounded-xl overflow-hidden shadow-2xl group border border-zinc-800 bg-zinc-950"
                            >
                                <img
                                    src={uploadedImage}
                                    alt="Uploaded preview"
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]" />
                                <button
                                    onClick={removeImage}
                                    className="absolute top-3 right-3 p-2 rounded-xl bg-red-500/20 backdrop-blur-md border border-red-500/50 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white z-20"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Customization Panel */}
                <div className="space-y-6 flex-1">
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1 flex justify-between">
                            Creative Prompt (Optional)
                            <span className="text-[10px] text-zinc-600 font-bold">
                                {prompt.length}/500
                            </span>
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value.slice(0, 500))}
                            placeholder="Add extra details or leave blank to use the style's default look..."
                            className="w-full h-32 px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 resize-none transition-all text-sm leading-relaxed"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] px-1">
                            Batch Size
                        </label>
                        <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
                            {[1, 2, 3, 4].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setImageCount(num)}
                                    className={cn(
                                        "flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200",
                                        imageCount === num
                                            ? "bg-zinc-800 text-blue-500 shadow-lg border border-zinc-700"
                                            : "text-zinc-600 hover:text-zinc-400"
                                    )}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Generate Button - Fixed at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pt-4 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-xl z-50">
                <button
                    onClick={() => {
                        if (!uploadedImage) {
                            toast.error("Photo required", {
                                description: "Please upload a photo of yourself first."
                            });
                            return;
                        }
                        if (!selectedStyle && !prompt.trim()) {
                            toast.warning("Style or Prompt required", {
                                description: "Please select a cosplay style or enter a custom prompt."
                            });
                            return;
                        }
                        onGenerate({ uploadedImage, customStyleImage, prompt, imageCount, selectedStyle });
                    }}
                    disabled={isGenerating}
                    className={cn(
                        "w-full py-3.5 rounded-xl flex items-center justify-center gap-3 font-bold transition-all duration-300 active:scale-[0.98] border shadow-2xl group",
                        isGenerating
                            ? "bg-zinc-900 border-zinc-800 text-zinc-700 cursor-not-allowed"
                            : "bg-linear-to-r from-[#FF8C37] via-[#E12B89] to-[#00B19D] hover:opacity-90 border-white/20 text-white shadow-xl"
                    )}
                >
                    {isGenerating ? (
                        <>
                            <Wand2 className="w-5 h-5 animate-pulse" />
                            Transforming...
                        </>
                    ) : (
                        <>
                            <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            Generate Cosplay
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
