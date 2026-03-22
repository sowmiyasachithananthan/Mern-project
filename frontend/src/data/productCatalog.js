// Product catalog — names, images & descriptions aligned (live data)
// Images: Pexels & Unsplash — Indian ethnic wear
export const productCatalog = [
  {
    name: "Maroon Silk Drape Saree",
    price: 12500,
    category: "Sarees",
    image: "https://images.pexels.com/photos/5868272/pexels-photo-5868272.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Rich maroon silk with subtle zari border. Perfect for weddings and festive occasions. Includes unstitched blouse fabric."
  },
  {
    name: "Pastel Block-Print Cotton Kurti",
    price: 1890,
    category: "Kurtis",
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Breathable cotton with hand block prints. Comfortable for daily wear; pairs with leggings or palazzos."
  },
  {
    name: "Rose Gold Embroidered Lehenga Set",
    price: 18500,
    category: "Lehengas",
    image: "https://images.pexels.com/photos/2869309/pexels-photo-2869309.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Heavy embroidery on skirt and dupatta with matching choli. Ideal for receptions and sangeet nights."
  },
  {
    name: "Ivory Floral Anarkali Suit",
    price: 4500,
    category: "Suits",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=85",
    description:
      "Floor-length anarkali with floral motifs, includes dupatta and churidar. Elegant for parties and pujas."
  },
  {
    name: "Satin Party Gown",
    price: 6900,
    category: "Gowns",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85",
    description:
      "Flowing silhouette with a refined drape. Suitable for cocktail evenings and formal celebrations."
  },
  {
    name: "Silk Brocade Blouse (Unstitched)",
    price: 2500,
    category: "Blouses",
    image: "https://images.pexels.com/photos/5880838/pexels-photo-5880838.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Premium silk brocade blouse material—get it tailored to your saree. Includes extra margin for adjustments."
  },
  {
    name: "Printed Palazzo & Kurti Co-ord",
    price: 2200,
    category: "Indo-Western",
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Coordinated set with relaxed palazzo pants and matching tunic. Easy Indo-western look for brunches and outings."
  },
  {
    name: "Net Embellished Dupatta",
    price: 5500,
    category: "Dupattas",
    image: "https://images.pexels.com/photos/5880836/pexels-photo-5880836.jpeg?auto=compress&cs=tinysrgb&w=600",
    description:
      "Sheer net dupatta with sequin and thread work. Layer over lehenga or suit sets for an instant festive upgrade."
  }
];

/** Match catalog entry by name or Unsplash/Pexels photo id */
function photoKey(url) {
  if (!url) return null;
  const u = String(url);
  const unsplash = u.match(/photo-(\d+-\w+)/);
  if (unsplash) return `u:${unsplash[1]}`;
  const pexels = u.match(/photos\/(\d+)/);
  if (pexels) return `p:${pexels[1]}`;
  return null;
}

export function enrichProduct(product) {
  if (!product) return product;
  const key = photoKey(product.image);
  const match =
    productCatalog.find((p) => p.name === product.name) ||
    (key ? productCatalog.find((p) => photoKey(p.image) === key) : null);
  if (!match) {
    return { ...product, description: product.description || "" };
  }
  return {
    ...product,
    name: match.name,
    category: match.category,
    image: match.image,
    description: product.description || match.description || ""
  };
}
