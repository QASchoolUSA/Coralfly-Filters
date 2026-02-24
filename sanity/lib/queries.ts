import { defineQuery } from "next-sanity";

export const PRODUCTS_QUERY = defineQuery(`*[_type == "product" && defined(slug.current) && coalesce(published, true) == true] | order(name asc) {
  _id,
  name,
  slug,
  partNumber,
  price,
  productType,
  brand,
  "imageUrl": images[0].asset->url
}`);

export const PRODUCTS_FILTERED_QUERY = defineQuery(`*[_type == "product" && defined(slug.current) && coalesce(published, true) == true 
  && ($type == null || productType == $type)
  && ($vehicle == null || $vehicle in vehicleFit)
] | order(name asc) {
  _id,
  name,
  slug,
  partNumber,
  price,
  productType,
  brand,
  vehicleFit,
  "imageUrl": images[0].asset->url
}`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`*[_type == "product" && slug.current == $slug && coalesce(published, true) == true][0] {
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

export const PRODUCTS_BY_TYPE_QUERY = defineQuery(`*[_type == "product" && productType == $type && coalesce(published, true) == true] | order(name asc) {
  _id,
  name,
  slug,
  partNumber,
  price,
  productType,
  brand,
  "imageUrl": images[0].asset->url
}`);
