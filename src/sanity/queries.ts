/**
 * Flexible GROQ that works across common ecommerce Sanity schemas.
 * Field aliases are normalized in products.ts after fetch.
 */
export const productsQuery = `*[
  _type in ["product", "products", "Product"]
  && !(_id in path("drafts.**"))
] | order(name asc, title asc) {
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
  "categoryTitle": coalesce(category->title, category->name, categories[0]->title, categories[0]->name, category),
  featured,
  images,
  image,
  mainImage,
  "gallery": coalesce(images, gallery, []),
  specs,
  specifications,
  "blurb": coalesce(description, shortDescription, excerpt)
}`;

export const productBySlugQuery = `*[
  _type in ["product", "products", "Product"]
  && !(_id in path("drafts.**"))
  && coalesce(slug.current, slug, store.slug.current) == $slug
][0] {
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
  "categoryTitle": coalesce(category->title, category->name, categories[0]->title, categories[0]->name, category),
  featured,
  images,
  image,
  mainImage,
  "gallery": coalesce(images, gallery, []),
  specs,
  specifications,
  "blurb": coalesce(description, shortDescription, excerpt)
}`;

export const categoriesQuery = `*[
  _type in ["product", "products", "Product"]
  && !(_id in path("drafts.**"))
]{
  "categoryTitle": coalesce(category->title, category->name, categories[0]->title, categories[0]->name, category)
}.categoryTitle`;
