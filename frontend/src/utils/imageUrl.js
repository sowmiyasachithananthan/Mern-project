// Returns the full image URL - supports both local paths and full URLs
export function getProductImageUrl(image) {
  if (!image) return "https://placehold.co/400x500/e8e0d5/8b7355?text=No+Image";
  if (image.startsWith("http")) return image;
  return `/images/${image}`;
}
