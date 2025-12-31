"use client"

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function HeroVideo() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false)

    return (
        <div className="relative aspect-video overflow-hidden rounded-xl border shadow-2xl">
            {/* Skeleton Overlay - Visible until video loads */}
            {!isVideoLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full z-10 rounded-xl" />
            )}

            <video
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setIsVideoLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                poster="/placeholder-poster.jpg"
            >
                <source src="https://lynxandparts.com/wp-content/uploads/2025/06/IMG_0901.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
