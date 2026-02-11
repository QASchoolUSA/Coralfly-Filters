import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lynxandparts.com'

    // Static routes
    const routes = [
        '',
        '/shop',
        '/contact',
        '/privacy-policy',
        '/terms-conditions',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Categories
    const categories = [
        'oil-filter',
        'fuel-filter',
        'air-filter',
        'cabin-air-filter',
        'fuel-water-separator',
        'multi-system-filter-kit',
        'lamp',
    ].map((slug) => ({
        url: `${baseUrl}/shop?type=${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...routes, ...categories]
}
