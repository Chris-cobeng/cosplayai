"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Download, Share2, ZoomIn, X, Clock, Trash2, ImageIcon, Plus, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";

interface GalleryImage {
    id: string;
    url: string;
    createdAt: Date;
}

interface MainContentProps {
    activeTab: "Styles" | "Gallery";
    onTabChange: (tab: "Styles" | "Gallery") => void;
    galleryImages: GalleryImage[];
    isGenerating: boolean;
    onClearGallery: () => void;
    onDeleteImage: (imageId: string) => void;
    customStyleImage: string | null;
    onCustomStyleChange: (image: string | null) => void;
    selectedStyle: number | string | null;
    onStyleSelect: (id: number | string | null) => void;
}

const CATEGORIES = ["Styles", "Gallery"] as const;

const STYLES = [
    {
        id: 1,
        name: "Cyberpunk Edge",
        category: "Sci-Fi",
        image: "/cyberpunk.png",
        popular: true,
    },
    {
        id: 2,
        name: "Medieval Warrior",
        category: "Fantasy",
        image: "/fantasy.png",
        popular: true,
    },
    {
        id: 3,
        name: "Mecha Pilot",
        category: "Anime/Manga",
        image: "/cyberpunk.png",
        popular: true,
    },
    {
        id: 4,
        name: "Elven Archer",
        category: "Fantasy",
        image: "/fantasy.png",
        popular: false,
    },
    {
        id: 5,
        name: "Space Marine",
        category: "Gaming",
        image: "/cyberpunk.png",
        popular: true,
    },
    {
        id: 6,
        name: "Victorian Gothic",
        category: "Historical",
        image: "/fantasy.png",
        popular: false,
    },
];

export default function MainContent({
    activeTab,
    onTabChange,
    galleryImages,
    isGenerating,
    onClearGallery,
    onDeleteImage,
    customStyleImage,
    onCustomStyleChange,
    selectedStyle,
    onStyleSelect,
}: MainContentProps) {
    const [dragActive, setDragActive] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState<number | null>(null);
    const [api, setApi] = useState<CarouselApi>();

    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCarouselIndex(api.selectedScrollSnap());
        };

        api.on("select", onSelect);
        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

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
        const url = URL.createObjectURL(file);
        onCustomStyleChange(url);
        onStyleSelect("custom");
    };

    const removeCustomStyle = (e: React.MouseEvent) => {
        e.stopPropagation();
        onCustomStyleChange(null);
        if (selectedStyle === "custom") onStyleSelect(null);
    };

    const filteredStyles = STYLES;

    // Format date for display
    const formatDate = (date: Date) => {
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    return (
        <div className="flex-1 w-full flex flex-col min-h-0 bg-zinc-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-zinc-800/50">
            {/* Top Tabs */}
            <div className="px-8 pt-8 pb-4 border-b border-zinc-800/50 flex items-center justify-between">
                <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => onTabChange(category)}
                            className="relative py-2 text-sm font-medium transition-colors whitespace-nowrap"
                        >
                            <div
                                className={cn(
                                    "relative z-10 transition-colors duration-200 flex items-center gap-2",
                                    activeTab === category ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                )}
                            >
                                {category}
                                {category === "Gallery" && galleryImages.length > 0 && (
                                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-bold bg-blue-500 text-white rounded-full leading-none">
                                        {galleryImages.length}
                                    </span>
                                )}
                            </div>
                            {activeTab === category && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Clear Gallery Button */}
                {activeTab === "Gallery" && galleryImages.length > 0 && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={onClearGallery}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-red-500/20"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Clear All
                    </motion.button>
                )}
            </div>

            {/* Content Area */}
            <div data-lenis-prevent className="flex-1 p-4 md:p-8 overflow-y-auto">
                <AnimatePresence mode="wait">
                    {activeTab === "Gallery" ? (
                        <motion.div
                            key="gallery"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="h-full"
                        >
                            {galleryImages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <div className="w-20 h-20 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-6 border border-zinc-700/50">
                                        <ImageIcon className="w-10 h-10 text-zinc-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">No generations yet</h3>
                                    <p className="text-zinc-500 max-w-sm mb-6">
                                        Your cosplay transformations will appear here. Start by choosing a style!
                                    </p>
                                    <button
                                        onClick={() => onTabChange("Styles")}
                                        className="px-6 py-3 bg-linear-to-r from-blue-600 to-violet-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-95"
                                    >
                                        Browse Styles
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {isGenerating && (
                                        <div className="mb-8">
                                            <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                                Processing request...
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                                {[1, 2].map((i) => (
                                                    <div key={i} className="aspect-3/4 rounded-2xl bg-zinc-800 animate-pulse flex items-center justify-center border border-zinc-700/50">
                                                        <div className="w-10 h-10 border-2 border-zinc-700 border-t-blue-500 rounded-full animate-spin" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                                        {galleryImages.map((image, idx) => (
                                            <motion.div
                                                key={image.id}
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="group relative aspect-3/4 rounded-2xl overflow-hidden shadow-xl bg-zinc-800 border border-zinc-700/50 cursor-pointer"
                                                onClick={() => setCarouselIndex(idx)}
                                            >
                                                <img src={image.url} alt="Generated cosplay" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                                                <div className="absolute top-3 left-3">
                                                    <span className="px-2 py-1 text-[10px] font-bold bg-black/60 backdrop-blur-md text-white rounded-lg border border-white/10">
                                                        {formatDate(image.createdAt)}
                                                    </span>
                                                </div>

                                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                        <button
                                                            onClick={() => setCarouselIndex(idx)}
                                                            className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110 border border-white/10"
                                                        >
                                                            <ZoomIn className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110 border border-white/10">
                                                            <Download className="w-5 h-5" />
                                                        </button>
                                                        <button className="p-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all transform hover:scale-110 border border-white/10">
                                                            <Share2 className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => onDeleteImage(image.id)}
                                                            className="p-2.5 bg-red-500/20 hover:bg-red-500/40 backdrop-blur-md rounded-full text-red-500 transition-all transform hover:scale-110 ml-auto border border-red-500/20"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="styles"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-12"
                        >
                            {/* Custom Style Upload Card */}
                            <motion.div
                                layoutId="style-custom"
                                onClick={() => onStyleSelect("custom")}
                                className={cn(
                                    "group relative aspect-3/4 rounded-2xl overflow-hidden cursor-pointer text-left transition-all duration-300 border-2 border-dashed",
                                    selectedStyle === "custom"
                                        ? "ring-1 ring-amber-500 ring-offset-2 ring-offset-zinc-950 shadow-amber-500/20 shadow-2xl scale-[1.02] border-amber-500 bg-amber-500/5"
                                        : dragActive
                                            ? "border-blue-500 bg-blue-500/10"
                                            : "border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 hover:-translate-y-1"
                                )}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                {!customStyleImage ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                                        <input
                                            type="file"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            onChange={handleChange}
                                            accept="image/png, image/jpeg, image/jpg"
                                        />
                                        <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center mb-4 border border-zinc-700/50 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-all duration-300">
                                            <Plus className="w-8 h-8 text-zinc-500 group-hover:text-blue-500" />
                                        </div>
                                        <p className="text-sm font-bold text-zinc-200">Custom Style</p>
                                        <p className="text-[10px] text-zinc-500 mt-2 uppercase tracking-wider">Drag or click to upload</p>
                                    </div>
                                ) : (
                                    <>
                                        <img
                                            src={customStyleImage}
                                            alt="Custom Style"
                                            className={cn(
                                                "w-full h-full object-contain bg-zinc-950 transition-transform duration-700",
                                                selectedStyle === "custom" ? "scale-[1.03]" : "group-hover:scale-[1.03]"
                                            )}
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                            <button
                                                onClick={removeCustomStyle}
                                                className="p-2 rounded-xl bg-red-500/20 backdrop-blur-md border border-red-500/50 text-red-500 transition-all hover:bg-red-500 hover:text-white z-20"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between bg-linear-to-t from-black/80 to-transparent">
                                            <div>
                                                <p className="text-white font-bold text-lg leading-tight">Your Style</p>
                                                <p className="text-zinc-400 text-[10px] mt-1 uppercase tracking-widest font-semibold">Custom Upload</p>
                                            </div>
                                            <div className={cn(
                                                "w-10 h-10 rounded-full bg-amber-600 border border-amber-400 text-white flex items-center justify-center transition-all duration-300 shadow-lg",
                                                selectedStyle === "custom" ? "scale-100 opacity-100" : "scale-0 opacity-0"
                                            )}>
                                                <Check className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>

                            {filteredStyles.map((style) => (
                                <motion.button
                                    key={style.id}
                                    layoutId={`style-${style.id}`}
                                    onClick={() => onStyleSelect(style.id)}
                                    className={cn(
                                        "group relative aspect-3/4 rounded-2xl overflow-hidden cursor-pointer text-left transition-all duration-300",
                                        selectedStyle === style.id
                                            ? "ring-1 ring-amber-500 ring-offset-2 ring-offset-zinc-950 shadow-amber-500/20 shadow-2xl scale-[1.02]"
                                            : "hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1"
                                    )}
                                >
                                    <img
                                        src={style.image}
                                        alt={style.name}
                                        className={cn(
                                            "w-full h-full object-cover transition-transform duration-700",
                                            selectedStyle === style.id ? "scale-[1.05]" : "group-hover:scale-[1.05]"
                                        )}
                                    />

                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                                    {/* Content */}
                                    <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-between">
                                        <div>
                                            <p className="text-white font-bold text-xl leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                {style.name}
                                            </p>
                                            <p className="text-zinc-400 text-xs mt-1 uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                {style.category}
                                            </p>
                                        </div>

                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform border shadow-lg",
                                            selectedStyle === style.id
                                                ? "bg-amber-600 border-amber-400 text-white scale-100 opacity-100"
                                                : "bg-white/10 border-white/10 text-white translate-y-4 opacity-0 group-hover:0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white/20"
                                        )}>
                                            <Check className="w-6 h-6" />
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Gallery Carousel Modal */}
                <Dialog open={carouselIndex !== null} onOpenChange={(open) => !open && setCarouselIndex(null)}>
                    <DialogContent className="max-w-none w-screen h-screen border-none bg-transparent p-0 overflow-hidden outline-none shadow-none">
                        <DialogTitle className="sr-only">Gallery Viewer</DialogTitle>
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Carousel
                                className="w-full h-full"
                                opts={{
                                    startIndex: carouselIndex ?? 0,
                                }}
                                setApi={setApi}
                            >
                                <CarouselContent className="h-full">
                                    {galleryImages.map((image) => (
                                        <CarouselItem key={image.id} className="h-full flex items-center justify-center">
                                            <div className="relative w-full h-full p-8 md:p-24 flex items-center justify-center">
                                                <img
                                                    src={image.url}
                                                    alt="Cosplay generation"
                                                    className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 md:px-16 pointer-events-none">
                                    <CarouselPrevious className="relative translate-x-0 pointer-events-auto bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white h-14 w-14 shadow-2xl hover:scale-110 transition-transform" />
                                    <CarouselNext className="relative translate-x-0 pointer-events-auto bg-zinc-900/50 border-zinc-800 text-white hover:bg-zinc-800 hover:text-white h-14 w-14 shadow-2xl hover:scale-110 transition-transform" />
                                </div>
                            </Carousel>
                        </div>

                        {/* Modal Footer Info */}
                        {carouselIndex !== null && galleryImages[carouselIndex] && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-zinc-900/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex flex-col items-center">
                                    <span className="text-white font-bold text-sm tracking-tight">Image {carouselIndex + 1} <span className="text-zinc-500 font-medium ml-1">of {galleryImages.length}</span></span>
                                    <span className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mt-0.5">{formatDate(galleryImages[carouselIndex].createdAt)}</span>
                                </div>
                                <div className="w-px h-8 bg-zinc-800 mx-2" />
                                <div className="flex items-center gap-2">
                                    <button className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all active:scale-95 group">
                                        <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                    <button className="p-2.5 hover:bg-white/10 rounded-xl text-zinc-400 hover:text-white transition-all active:scale-95 group">
                                        <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
