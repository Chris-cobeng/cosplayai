"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { UserButton } from "@clerk/nextjs";
import { Menu, X as CloseMenu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define a type for gallery images with timestamp
interface GalleryImage {
    id: string;
    url: string;
    createdAt: Date;
}

export default function DashboardPage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState<"Styles" | "Gallery">("Styles");
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [customStyleImage, setCustomStyleImage] = useState<string | null>(null);
    const [selectedStyle, setSelectedStyle] = useState<number | string | null>(null);

    const handleGenerate = async (data: any) => {
        setIsGenerating(true);
        // Switch to gallery immediately so user sees the progress
        setActiveTab("Gallery");

        // Simulate API call
        setTimeout(() => {
            // Mock result - create new images with IDs and timestamps
            const mockUrls = [
                "/cyberpunk.png",
                "/fantasy.png",
                "/cyberpunk.png",
                "/fantasy.png"
            ].slice(0, data.imageCount || 2);

            const newImages: GalleryImage[] = mockUrls.map((url, idx) => ({
                id: `${Date.now()}-${idx}`,
                url,
                createdAt: new Date()
            }));

            // Add new images at the beginning (newest first)
            setGalleryImages(prev => [...newImages, ...prev]);
            setIsGenerating(false);
        }, 3000);
    };

    const clearGallery = () => {
        setGalleryImages([]);
    };

    const deleteImage = (imageId: string) => {
        setGalleryImages(prev => prev.filter(img => img.id !== imageId));
    };

    return (
        <div className="flex flex-col h-screen w-full bg-zinc-950 text-zinc-100 font-sans selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden">
            {/* Top Global Header */}
            <header className="h-16 w-full flex items-center justify-between px-6 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 -ml-2 hover:bg-zinc-800 rounded-lg text-zinc-400 md:hidden transition-colors"
                    >
                        {isMobileMenuOpen ? <CloseMenu className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-tr from-blue-600 to-violet-600 rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center text-white font-bold text-xl">
                            C
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-bold text-xl tracking-tight text-white block leading-none">CosplayAI</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-zinc-400">System Ready</span>
                    </div>
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                userButtonAvatarBox: "w-9 h-9 border border-zinc-700 hover:border-zinc-600 transition-colors"
                            }
                        }}
                    />
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Mobile Sidebar Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Sidebar Area */}
                <aside className={cn(
                    "fixed md:relative top-0 left-0 h-full w-[380px] shrink-0 flex flex-col border-r border-zinc-800 bg-zinc-950/90 backdrop-blur-2xl z-50 transition-transform duration-300 md:translate-x-0 md:bg-zinc-900/20 overflow-hidden",
                    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                )}>
                    <div className="flex-1 min-h-0 h-full">
                        <Sidebar
                            onGenerate={(data) => {
                                handleGenerate(data);
                                setIsMobileMenuOpen(false);
                            }}
                            isGenerating={isGenerating}
                            customStyleImage={customStyleImage}
                            selectedStyle={selectedStyle}
                        />
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 relative bg-zinc-950 flex flex-col min-h-0 h-full overflow-hidden">
                    <div className="flex-1 w-full px-4 pb-4 lg:px-8 lg:pb-8 pt-0 flex flex-col min-h-0">
                        <MainContent
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            galleryImages={galleryImages}
                            onDeleteImage={deleteImage}
                            isGenerating={isGenerating}
                            onClearGallery={clearGallery}
                            customStyleImage={customStyleImage}
                            onCustomStyleChange={setCustomStyleImage}
                            selectedStyle={selectedStyle}
                            onStyleSelect={setSelectedStyle}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}
