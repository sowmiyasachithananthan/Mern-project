import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState(null);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    setSubError(null);
    try {
      const res = await fetch(`${API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribed(true);
        setEmail("");
      } else {
        setSubError(data.message || "Could not subscribe");
      }
    } catch {
      setSubError("Could not subscribe. Try again.");
    }
  };

  return (
    <div className="home">
      <section className="home-banner">
        <div className="banner-content">
          <h1>Shreyas Boutique</h1>
          <p className="banner-tagline">Timeless elegance, crafted for you</p>
          <p className="banner-sub">
            Handpicked ethnic wear, contemporary silhouettes, and pieces that celebrate your style.
          </p>
          <Link to="/products" className="btn btn-primary">
            Shop Collection
          </Link>
        </div>
      </section>

      <section className="hero-compact">
        <h2>Welcome</h2>
        <p className="hero-sub">
          Discover sarees, kurtis, lehengas, suits and more—curated for every occasion.
        </p>
        <Link to="/products" className="btn btn-secondary">View all products</Link>
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/products?cat=sarees" className="category-tile">
            <span className="cat-icon">🧣</span>
            <span>Sarees</span>
          </Link>
          <Link to="/products?cat=kurtis" className="category-tile">
            <span className="cat-icon">👗</span>
            <span>Kurtis</span>
          </Link>
          <Link to="/products?cat=lehengas" className="category-tile">
            <span className="cat-icon">✨</span>
            <span>Lehengas</span>
          </Link>
          <Link to="/products?cat=suits" className="category-tile">
            <span className="cat-icon">👘</span>
            <span>Suits</span>
          </Link>
          <Link to="/products" className="category-tile">
            <span className="cat-icon">🌟</span>
            <span>View All</span>
          </Link>
        </div>
      </section>

      <section className="why-us-section">
        <h2>Why Choose Us</h2>
        <div className="why-grid">
          <div className="why-card">
            <span className="why-icon">✨</span>
            <h3>Curated Collection</h3>
            <p>Handpicked styles for every occasion—from intimate gatherings to grand celebrations.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">💫</span>
            <h3>Premium Quality</h3>
            <p>Finest fabrics and craftsmanship. Garments that stand the test of time.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">🌸</span>
            <h3>Unique Designs</h3>
            <p>Exclusive pieces blending contemporary flair with timeless Indian aesthetics.</p>
          </div>
          <div className="why-card">
            <span className="why-icon">💝</span>
            <h3>Personal Service</h3>
            <p>Styling advice and alterations. We're here to help you look your best.</p>
          </div>
        </div>
      </section>

      <section className="quick-links-section">
        <div className="quick-link-card">
          <h3>New Arrivals</h3>
          <p>Explore our latest collection</p>
          <Link to="/products" className="btn btn-secondary btn-sm">Shop Now</Link>
        </div>
        <div className="quick-link-card">
          <h3>Visit Our Store</h3>
          <p>T. Nagar, Chennai</p>
          <Link to="/contact" className="btn btn-secondary btn-sm">Get Directions</Link>
        </div>
      </section>

      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>Subscribe for new arrivals, offers, and styling tips.</p>
        {subscribed ? (
          <p className="newsletter-success">Thank you for subscribing!</p>
        ) : (
          <form className="newsletter-form" onSubmit={handleNewsletter}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        )}
        {subError && <p className="newsletter-error">{subError}</p>}
      </section>
    </div>
  );
}

export default Home;
