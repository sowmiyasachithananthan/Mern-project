import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { getProductImageUrl } from "../utils/imageUrl";

function Cart() {
  const { cart, updateCartQty, removeFromCart } = useShop();

  const subtotal = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  if (cart.length === 0) {
    return (
      <div className="page cart-page">
        <section className="page-hero">
          <h1>Your Cart</h1>
          <p>Your cart is empty</p>
        </section>
        <div className="empty-state">
          <p>Browse our collection and add items you love.</p>
          <Link to="/products" className="btn btn-primary">Continue shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <section className="page-hero">
        <h1>Your Cart</h1>
        <p>{cart.length} item{cart.length !== 1 ? "s" : ""}</p>
      </section>

      <div className="cart-layout">
        <ul className="cart-list">
          {cart.map((item) => (
            <li key={item._id} className="cart-row">
              <Link to={`/product/${item._id}`} className="cart-thumb">
                <img src={getProductImageUrl(item.image)} alt="" />
              </Link>
              <div className="cart-details">
                <Link to={`/product/${item._id}`}>
                  <h3>{item.name}</h3>
                </Link>
                <p className="cart-price">₹{item.price?.toLocaleString()} each</p>
              </div>
              <div className="cart-qty">
                <button
                  type="button"
                  aria-label="Decrease"
                  onClick={() => updateCartQty(item._id, (item.quantity || 1) - 1)}
                >
                  −
                </button>
                <span>{item.quantity || 1}</span>
                <button
                  type="button"
                  aria-label="Increase"
                  onClick={() => updateCartQty(item._id, (item.quantity || 1) + 1)}
                >
                  +
                </button>
              </div>
              <p className="cart-line-total">
                ₹{(item.price * (item.quantity || 1)).toLocaleString()}
              </p>
              <button
                type="button"
                className="cart-remove"
                onClick={() => removeFromCart(item._id)}
                aria-label="Remove"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <p className="cart-note">Shipping calculated at checkout.</p>
          <Link to="/checkout" className="btn btn-primary btn-block checkout-btn">
            Proceed to checkout
          </Link>
          <Link to="/products" className="cart-continue">Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
