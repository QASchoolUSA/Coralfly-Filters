"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"

interface ProductGalleryProps {
    images: string[]
    productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const handleThumbnailClick = (index: number) => {
        if (api) {
            api.scrollTo(index)
        }
    }

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square relative overflow-hidden rounded-xl border bg-slate-50 flex items-center justify-center text-muted-foreground">
                No Image Available
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Main Carousel */}
            <div className="relative">
                <Carousel setApi={setApi} className="w-full">
                    <CarouselContent>
                        {images.map((src, index) => (
                            <CarouselItem key={index}>
                                <div className="aspect-square relative overflow-hidden rounded-xl border bg-slate-50">
                                    <Image
                                        src={src}
                                        alt={`${productName} - Image ${index + 1}`}
                                        fill
                                        className="object-contain"
                                        priority={index === 0}
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {images.length > 1 && (
                        <>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                        </>
                    )}
                </Carousel>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                    {current + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 pt-2 px-1 scrollbar-hide">
                    {images.map((src, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={cn(
                                "relative aspect-square w-20 min-w-20 overflow-hidden rounded-md border bg-slate-50",
                                current === index
                                    ? "ring-2 ring-primary ring-offset-2"
                                    : "opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={src}
                                alt={`${productName} - Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
