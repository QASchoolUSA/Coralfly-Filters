import { getProducts } from "@/sanity/products";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim().toLocaleLowerCase() ?? "";
  if (query.length < 2) return Response.json({ results: [] });

  const products = await getProducts();
  const results = products
    .map((product) => {
      const fields = [
        product.name,
        product.sku,
        product.category,
        product.description,
        product.brand,
        ...(product.compatibleMakes ?? []),
        ...(product.fitmentDetails ?? []).flatMap((fitment) => [
          fitment.brand,
          ...(fitment.models ?? []),
          ...(fitment.engines ?? []),
          fitment.notes,
        ]),
        ...(product.crossReferences ?? []),
      ];
      const score = fields.reduce((total, field) => {
        const value = field?.toLocaleLowerCase() ?? "";
        return total + (value === query ? 4 : value.startsWith(query) ? 2 : value.includes(query) ? 1 : 0);
      }, 0);
      return { product, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))
    .slice(0, 8)
    .map(({ product }) => ({
      id: product._id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      category: product.category,
      price: product.price,
      currency: product.currency,
      image: product.images[0],
      inStock: product.inStock,
      fitment: product.fitmentDetails?.map((fitment) => fitment.brand).join(", ") || product.compatibleMakes?.join(", "),
    }));

  return Response.json({ results }, { headers: { "Cache-Control": "no-store" } });
}
