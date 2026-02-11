"use client"

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function HeroVideo() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    return (
        <div className="relative aspect-video overflow-hidden rounded-xl border shadow-2xl bg-muted">
            {/* Poster Image / Skeleton Overlay - Visible until video loads */}
            <div className={`absolute inset-0 z-10 transition-opacity duration-700 ${isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <img
                    src="/trucking-poster.jpg"
                    alt="Trucking Logistics"
                    className="w-full h-full object-cover"
                />
            </div>

            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onLoadedData={() => setIsVideoLoaded(true)}
                onCanPlay={() => setIsVideoLoaded(true)}
                onLoadedMetadata={() => setIsVideoLoaded(true)}
                className="w-full h-full object-cover"
                poster="/trucking-poster.jpg"
            >
                <source src="https://lynxandparts.com/wp-content/uploads/2025/06/IMG_0901.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
