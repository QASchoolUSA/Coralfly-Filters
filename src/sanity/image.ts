import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!builder || !source) return null;
  try {
    return builder.image(source);
  } catch {
    return null;
  }
}

/**
 * Build a CDN URL from many possible Sanity image shapes:
 * - expanded asset with url
 * - image object with asset._ref
 * - bare asset reference
 * - plain URL string
 */
export function resolveSanityImageUrl(source: unknown): string | null {
  if (!source) return null;

  if (typeof source === "string") {
    const value = source.trim();
    if (!value) return null;
    if (value.startsWith("http://") || value.startsWith("https://")) return value;
    // Sanity asset id like image-abc123-800x600-jpg
    if (value.startsWith("image-") && projectId) {
      return buildCdnUrlFromAssetId(value);
    }
    return null;
  }

  if (typeof source !== "object") return null;
  const obj = source as Record<string, unknown>;

  if (typeof obj.url === "string" && obj.url.startsWith("http")) {
    return obj.url;
  }

  // Nested image wrappers: { image: {...} }, { asset: {...} }
  if (obj.image && typeof obj.image === "object") {
    const nested = resolveSanityImageUrl(obj.image);
    if (nested) return nested;
  }

  if (obj.asset) {
    if (typeof obj.asset === "string") {
      return resolveSanityImageUrl(obj.asset);
    }
    if (typeof obj.asset === "object" && obj.asset !== null) {
      const asset = obj.asset as Record<string, unknown>;
      if (typeof asset.url === "string" && asset.url.startsWith("http")) {
        return asset.url;
      }
      if (typeof asset._ref === "string") {
        const fromBuilder = urlForImage(obj as SanityImageSource)
          ?.width(1200)
          .url();
        if (fromBuilder) return fromBuilder;
        return buildCdnUrlFromAssetRef(asset._ref);
      }
      if (typeof asset._id === "string" && asset._id.startsWith("image-")) {
        return buildCdnUrlFromAssetId(asset._id);
      }
    }
  }

  if (typeof obj._ref === "string") {
    const fromBuilder = urlForImage(obj as SanityImageSource)?.width(1200).url();
    if (fromBuilder) return fromBuilder;
    return buildCdnUrlFromAssetRef(obj._ref);
  }

  if (obj._type === "image" || obj._type === "sanity.imageAsset") {
    const fromBuilder = urlForImage(obj as SanityImageSource)?.width(1200).url();
    if (fromBuilder) return fromBuilder;
  }

  return null;
}

function buildCdnUrlFromAssetRef(ref: string): string | null {
  // ref format: image-{id}-{width}x{height}-{format}
  if (!ref.startsWith("image-") || !projectId) return null;
  return buildCdnUrlFromAssetId(ref);
}

function buildCdnUrlFromAssetId(assetId: string): string | null {
  if (!projectId) return null;
  // image-abc123def-1024x768-jpg -> abc123def-1024x768.jpg
  const withoutPrefix = assetId.replace(/^image-/, "");
  const lastDash = withoutPrefix.lastIndexOf("-");
  if (lastDash === -1) return null;
  const idAndDims = withoutPrefix.slice(0, lastDash);
  const format = withoutPrefix.slice(lastDash + 1);
  if (!format) return null;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${idAndDims}.${format}`;
}
