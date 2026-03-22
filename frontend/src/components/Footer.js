import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Shreyas Boutique</h4>
          <p>Elegant fashion for every occasion</p>
        </div>
        <div className="footer-section">
          <h4>Shop</h4>
          <Link to="/">Home</Link>
          <Link to="/products">All Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/returns">Returns & Refunds</Link>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>✉️ hello@shreyasboutique.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 T. Nagar, Chennai</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Shreyas Boutique. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
