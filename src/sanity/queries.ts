/**
 * Resolve image URLs in GROQ so we don't rely only on the JS URL builder.
 * Covers common Sanity ecommerce field names (including Shopify-synced stores).
 */
const imageProjection = /* groq */ `
  "resolvedImages": array::compact([
    ...coalesce(images, [])[]{
      "url": coalesce(asset->url, url, asset->secure_url),
      "alt": coalesce(alt, caption, title)
    },
    ...coalesce(gallery, [])[]{
      "url": coalesce(asset->url, url),
      "alt": coalesce(alt, caption, title)
    },
    ...coalesce(photos, [])[]{
      "url": coalesce(asset->url, url),
      "alt": coalesce(alt, caption, title)
    },
    ...coalesce(media, [])[]{
      "url": coalesce(asset->url, url, image.asset->url),
      "alt": coalesce(alt, caption, title)
    },
    ...coalesce(defaultProductVariant.images, [])[]{
      "url": coalesce(asset->url, url),
      "alt": coalesce(alt, caption)
    },
    {
      "url": coalesce(
        mainImage.asset->url,
        image.asset->url,
        photo.asset->url,
        thumbnail.asset->url,
        coverImage.asset->url,
        productImage.asset->url,
        store.previewImageUrl,
        defaultProductVariant.images[0].asset->url
      ),
      "alt": coalesce(mainImage.alt, image.alt, photo.alt, name, title)
    }
  ])[defined(url) && url != null && url != ""]
`;

const productFields = /* groq */ `
  _id,
  _type,
  name,
  title,
  "slug": coalesce(slug.current, slug, store.slug.current),
  description,
  body,
  price,
  "priceValue": coalesce(price, defaultProductVariant.price, store.price),
  currency,
  sku,
  "skuValue": coalesce(sku, defaultProductVariant.sku, store.sku),
  category,
  "categoryTitle": coalesce(
    category->title,
    category->name,
    categories[0]->title,
    categories[0]->name,
    category
  ),
  featured,
  images,
  image,
  mainImage,
  photo,
  photos,
  gallery,
  media,
  thumbnail,
  coverImage,
  productImage,
  store,
  defaultProductVariant,
  ${imageProjection},
  specs,
  specifications,
  "blurb": coalesce(description, shortDescription, excerpt)
`;

export const productsQuery = `*[
  _type in ["product", "products", "Product"]
  && !(_id in path("drafts.**"))
] | order(name asc, title asc) {
  ${productFields}
}`;

export const productBySlugQuery = `*[
  _type in ["product", "products", "Product"]
  && !(_id in path("drafts.**"))
  && coalesce(slug.current, slug, store.slug.current) == $slug
][0] {
  ${productFields}
}`;

export const categoriesQuery = `*[
  _type in ["product", "products", "Product"]
  && !(_id in path("drafts.**"))
]{
  "categoryTitle": coalesce(
    category->title,
    category->name,
    categories[0]->title,
    categories[0]->name,
    category
  )
}.categoryTitle`;

/** Introspection helper: sample products + raw image field shapes */
export const sampleProductsImageDebugQuery = `*[
  _type in ["product", "products", "Product"]
  && !(_id in path("drafts.**"))
][0...5]{
  _id,
  _type,
  name,
  title,
  "slug": coalesce(slug.current, slug, store.slug.current),
  "imageKeys": [
    select(defined(images) => "images"),
    select(defined(image) => "image"),
    select(defined(mainImage) => "mainImage"),
    select(defined(gallery) => "gallery"),
    select(defined(photos) => "photos"),
    select(defined(photo) => "photo"),
    select(defined(media) => "media"),
    select(defined(thumbnail) => "thumbnail"),
    select(defined(coverImage) => "coverImage"),
    select(defined(store.previewImageUrl) => "store.previewImageUrl")
  ],
  images,
  image,
  mainImage,
  gallery,
  photos,
  "preview": store.previewImageUrl,
  ${imageProjection}
}`;
