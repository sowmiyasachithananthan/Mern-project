import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function Header() {
  const { cartCount, wishlist } = useShop();

  return (
    <header className="header">
      <Link to="/" className="logo">
        Shreyas Boutique
      </Link>
      <nav className="nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Shop</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/faq" className="nav-link">FAQ</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
      <div className="header-actions">
        <Link to="/wishlist" className="header-icon-link" title="Wishlist">
          <span className="header-icon" aria-hidden>♡</span>
          {wishlist.length > 0 && (
            <span className="header-badge">{wishlist.length}</span>
          )}
        </Link>
        <Link to="/cart" className="header-icon-link" title="Cart">
          <span className="header-icon cart-icon" aria-hidden>🛒</span>
          {cartCount > 0 && (
            <span className="header-badge">{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
