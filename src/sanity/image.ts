import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { sanityClient, isSanityConfigured } from "./client";

const builder =
  isSanityConfigured && sanityClient
    ? createImageUrlBuilder(sanityClient)
    : null;

export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!builder || !source) return null;
  return builder.image(source);
}
