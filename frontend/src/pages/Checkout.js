import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { getProductImageUrl } from "../utils/imageUrl";
import { API_URL } from "../config";

function Checkout() {
  const { cart, clearCart } = useShop();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  const subtotal = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
  const shipping = subtotal >= 5000 ? 0 : 99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          customer: form
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        clearCart();
        navigate(`/order-success?order=${data.orderNumber}`);
      } else {
        setError(data.message || "Order failed");
      }
    } catch {
      setError("Could not place order. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !loading) {
    return (
      <div className="page checkout-page">
        <section className="page-hero">
          <h1>Checkout</h1>
        </section>
        <div className="empty-state">
          <p>Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page checkout-page">
      <section className="page-hero">
        <h1>Checkout</h1>
        <p>Complete your order</p>
      </section>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <div className="checkout-main">
          <div className="checkout-section">
            <h2>Shipping details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full name *</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group form-full">
                <label htmlFor="address">Address *</label>
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  id="city"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input
                  id="pincode"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="checkout-summary">
          <h2>Order summary</h2>
          <ul className="checkout-items">
            {cart.map((item) => (
              <li key={item._id} className="checkout-item">
                <img src={getProductImageUrl(item.image)} alt="" />
                <div>
                  <strong>{item.name}</strong>
                  <span>× {item.quantity || 1} — ₹{(item.price * (item.quantity || 1)).toLocaleString()}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout-totals">
            <div className="checkout-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="checkout-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
            </div>
            <div className="checkout-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
          {error && <p className="checkout-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Placing order…" : "Place order"}
          </button>
          <Link to="/cart" className="checkout-back">← Back to cart</Link>
        </aside>
      </form>
    </div>
  );
}

export default Checkout;
