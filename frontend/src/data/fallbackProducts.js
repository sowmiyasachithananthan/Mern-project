import { productCatalog } from "./productCatalog";

/** Products to show when API is unreachable - uses catalog with temp IDs */
export function getFallbackProducts() {
  return productCatalog.map((p, i) => ({
    _id: `fallback-${i + 1}`,
    ...p
  }));
}
