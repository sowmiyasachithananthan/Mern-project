import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { getProductImageUrl } from "../utils/imageUrl";

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="page wishlist-page">
        <section className="page-hero">
          <h1>Wishlist</h1>
          <p>Save your favourite pieces here</p>
        </section>
        <div className="empty-state">
          <p>You haven't saved anything yet.</p>
          <Link to="/products" className="btn btn-primary">Browse shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page wishlist-page">
      <section className="page-hero">
        <h1>Wishlist</h1>
        <p>{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
      </section>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <div key={item._id} className="wishlist-card">
            <Link to={`/product/${item._id}`} className="wishlist-img-wrap">
              <img src={getProductImageUrl(item.image)} alt={item.name} />
            </Link>
            <div className="wishlist-info">
              <Link to={`/product/${item._id}`}>
                <h3>{item.name}</h3>
              </Link>
              <p className="product-price">₹{item.price?.toLocaleString()}</p>
              <div className="wishlist-actions">
                <button type="button" className="btn btn-primary btn-sm" onClick={() => addToCart(item, 1)}>
                  Add to cart
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => toggleWishlist(item)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
