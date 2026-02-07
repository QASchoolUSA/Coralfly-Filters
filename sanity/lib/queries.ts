import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`*[_type == "product" && defined(slug.current)] | order(name asc) {
  _id,
  name,
  slug,
  partNumber,
  price,
  productType,
  brand,
  "imageUrl": images[0].asset->url
}`);

export const PRODUCTS_FILTERED_QUERY = defineQuery(`*[_type == "product" && defined(slug.current) 
  && ($type == null || productType == $type)
] | order(name asc) {
  _id,
  name,
  slug,
  partNumber,
  price,
  productType,
  brand,
  "imageUrl": images[0].asset->url
}`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  partNumber,
  price,
  productType,
  brand,
  description,
  "imageUrl": images[0].asset->url,
  "images": images[].asset->url,
  seoTitle,
  seoDescription
}`);

export const PRODUCTS_BY_TYPE_QUERY = defineQuery(`*[_type == "product" && productType == $type] | order(name asc) {
  _id,
  name,
  slug,
  partNumber,
  price,
  productType,
  brand,
  "imageUrl": images[0].asset->url
}`);
