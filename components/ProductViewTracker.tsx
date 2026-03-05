'use client'

import { useEffect } from 'react'

export function ProductViewTracker({ partNumber }: { partNumber: string }) {
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('track', 'ViewContent', {
                content_ids: [partNumber],
                content_type: 'product'
            })
        }
    }, [partNumber])

    return null
}
