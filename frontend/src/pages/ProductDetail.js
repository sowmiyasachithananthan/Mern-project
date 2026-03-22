import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { enrichProduct } from "../data/productCatalog";
import { getFallbackProducts } from "../data/fallbackProducts";
import { getProductImageUrl } from "../utils/imageUrl";
import { useShop } from "../context/ShopContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();

  useEffect(() => {
    setLoading(true);
    const fallbackMatch = String(id).match(/^fallback-(\d+)$/);
    if (fallbackMatch) {
      const fallback = getFallbackProducts().find((p) => p._id === id);
      if (fallback) {
        setProduct(enrichProduct(fallback));
        setError(null);
      } else {
        setProduct(null);
        setError("Product not found");
      }
      setLoading(false);
      return;
    }
    fetch(`${API_URL}/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(enrichProduct(data));
        setError(null);
      })
      .catch(() => {
        setProduct(null);
        setError("Product not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="page product-detail-page">
        <div className="loading">
          <div className="loader"></div>
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page product-detail-page">
        <div className="error-message">
          <h2>Product not found</h2>
          <p>This product may have been removed or the link is incorrect.</p>
          <Link to="/products" className="btn btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const inWish = isInWishlist(product._id);

  return (
    <div className="page product-detail-page">
      <Link to="/products" className="back-link">
        ← Back to Shop
      </Link>

      <div className="product-detail">
        <div className="product-detail-image">
          <img
            src={getProductImageUrl(product.image)}
            alt={product.name}
          />
        </div>
        <div className="product-detail-info">
          {product.category && (
            <span className="detail-category">{product.category}</span>
          )}
          <h1>{product.name}</h1>
          <p className="detail-price">₹{product.price?.toLocaleString()}</p>
          {product.description && (
            <p className="detail-description">{product.description}</p>
          )}
          <div className="product-detail-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addToCart(product, 1)}
            >
              Add to cart
            </button>
            <button
              type="button"
              className={`btn btn-outline ${inWish ? "active" : ""}`}
              onClick={() => toggleWishlist(product)}
            >
              {inWish ? "♥ Saved" : "♡ Add to wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
