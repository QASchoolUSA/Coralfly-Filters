import { NextResponse } from "next/server";
import { sanityClient, isSanityConfigured } from "@/sanity/client";
import { normalizeProduct } from "@/sanity/products";
import { sampleProductsImageDebugQuery } from "@/sanity/queries";

/**
 * Temporary debug endpoint: GET /api/debug/sanity-images
 * Shows raw vs resolved image fields for the first few products.
 */
export async function GET() {
  if (!isSanityConfigured || !sanityClient) {
    return NextResponse.json({
      configured: false,
      message: "Sanity env vars are not set",
    });
  }

  try {
    const raw = await sanityClient.fetch<Record<string, unknown>[]>(
      sampleProductsImageDebugQuery,
    );

    const summary = (raw || []).map((doc) => {
      const normalized = normalizeProduct(doc);
      return {
        _id: doc._id,
        name: doc.name || doc.title,
        imageKeys: doc.imageKeys,
        resolvedFromGroq: doc.resolvedImages,
        normalizedImageCount: normalized?.images.length ?? 0,
        normalizedUrls: normalized?.images.map((i) => i.url) ?? [],
      };
    });

    return NextResponse.json({ configured: true, count: summary.length, summary });
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        error: error instanceof Error ? error.message : "Fetch failed",
      },
      { status: 500 },
    );
  }
}
