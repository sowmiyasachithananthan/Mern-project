import { Link } from "react-router-dom";
import { getProductImageUrl } from "../utils/imageUrl";
import { useShop } from "../context/ShopContext";

function ProductCard({ item }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWish = isInWishlist(item._id);

  const handleCart = (e) => {
    e.stopPropagation();
    addToCart(item, 1);
  };

  const handleWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(item);
  };

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${item._id}`}>
          <img
            src={getProductImageUrl(item.image)}
            alt={item.name}
            className="product-image"
          />
        </Link>
        {item.category && (
          <span className="product-category">{item.category}</span>
        )}
        <button
          type="button"
          className={`wishlist-btn ${inWish ? "active" : ""}`}
          onClick={handleWish}
          aria-label={inWish ? "Remove from wishlist" : "Add to wishlist"}
        >
          {inWish ? "♥" : "♡"}
        </button>
      </div>
      <Link to={`/product/${item._id}`} className="product-info product-info-link">
        <h3>{item.name}</h3>
        <p className="product-price">₹{item.price?.toLocaleString()}</p>
      </Link>
      <div className="product-card-actions">
        <button type="button" className="btn btn-cart" onClick={handleCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
