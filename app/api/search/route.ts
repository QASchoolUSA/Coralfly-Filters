
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
        return NextResponse.json([])
    }

    try {
        const products = await client.fetch(
            groq`*[_type == "product" && (name match $q + "*" || partNumber match $q + "*")] | order(name asc) [0...5] {
                _id,
                name,
                "slug": slug.current,
                partNumber,
                "imageUrl": images[0].asset->url,
                price
            }`,
            { q: query }
        )

        return NextResponse.json(products)
    } catch (error) {
        console.error('Search error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
