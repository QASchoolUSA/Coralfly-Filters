export type ProductImage = {
  url: string;
  alt?: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  /** Price in major currency units (e.g. dollars) */
  price: number;
  currency: string;
  sku?: string;
  category?: string;
  featured?: boolean;
  images: ProductImage[];
  specs?: ProductSpec[];
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
