import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_CART = "shreyas_boutique_cart";
const STORAGE_WISH = "shreyas_boutique_wishlist";

const ShopContext = createContext(null);

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => loadJson(STORAGE_CART, []));
  const [wishlist, setWishlist] = useState(() => loadJson(STORAGE_WISH, []));

  useEffect(() => {
    localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_WISH, JSON.stringify(wishlist));
  }, [wishlist]);

  const cartCount = useMemo(() => cart.reduce((n, i) => n + (i.quantity || 1), 0), [cart]);

  const addToCart = (product, qty = 1) => {
    const id = String(product._id);
    setCart((prev) => {
      const existing = prev.find((i) => String(i._id) === id);
      if (existing) {
        return prev.map((i) =>
          String(i._id) === id ? { ...i, quantity: (i.quantity || 1) + qty } : i
        );
      }
      const { quantity: _q, ...rest } = product;
      return [...prev, { ...rest, _id: product._id, quantity: qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => String(i._id) !== String(id)));
  };

  const clearCart = () => setCart([]);

  const updateCartQty = (id, qty) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (String(i._id) === String(id) ? { ...i, quantity: qty } : i))
    );
  };

  const toggleWishlist = (product) => {
    const id = String(product._id);
    setWishlist((prev) => {
      if (prev.some((i) => String(i._id) === id)) {
        return prev.filter((i) => String(i._id) !== id);
      }
      const { quantity: _q, ...rest } = product;
      return [...prev, { ...rest, _id: product._id }];
    });
  };

  const isInWishlist = (id) => wishlist.some((i) => String(i._id) === String(id));

  const value = {
    cart,
    wishlist,
    cartCount,
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    toggleWishlist,
    isInWishlist
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
