'use client'

import { useEffect } from 'react'

export function PurchaseTracker({ partNumbers, value, currency = 'USD' }: { partNumbers: string[], value: number, currency?: string }) {
    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('track', 'Purchase', {
                content_ids: partNumbers,
                content_type: 'product',
                value: value,
                currency: currency
            })
        }
    }, [partNumbers, value, currency])

    return null
}
