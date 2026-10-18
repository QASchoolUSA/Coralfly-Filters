export type ProductImage = {
  url: string;
  alt?: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductFitment = {
  brand: string;
  models?: string[];
  engines?: string[];
  notes?: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  descriptionRaw?: unknown[];
  /** Price in major currency units (e.g. dollars) */
  price: number;
  currency: string;
  sku?: string;
  category?: string;
  compareAtPrice?: number;
  inStock?: boolean;
  details?: string;
  crossReferences?: string[];
  brand?: string;
  productType?: string;
  compatibleMakes?: string[];
  fitmentDetails?: ProductFitment[];
  featured?: boolean;
  images: ProductImage[];
  specs?: ProductSpec[];
  rating?: number;
  reviewsCount?: number;
};

export type CartItem = {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  image?: string;
  quantity: number;
  sku?: string;
};
