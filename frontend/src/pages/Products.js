import { useEffect, useState, useMemo, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { API_URL } from "../config";
import { enrichProduct } from "../data/productCatalog";
import { getFallbackProducts } from "../data/fallbackProducts";
import ProductCard from "../components/ProductCard";

function Products() {
  const [searchParams] = useSearchParams();
  const catFilter = searchParams.get("cat")?.toLowerCase();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`${API_URL}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not load products");
        return res.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data.map((p) => enrichProduct(p)) : [];
        setProducts(list);
        setUsingFallback(false);
      })
      .catch((err) => {
        setError(err.message);
        setProducts(getFallbackProducts().map((p) => enrichProduct(p)));
        setUsingFallback(true);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    if (!catFilter) return products;
    return products.filter((p) =>
      (p.category || "").toLowerCase().includes(catFilter)
    );
  }, [products, catFilter]);

  return (
    <div className="page products-page">
      <section className="page-hero">
        <h1>Our Collection</h1>
        <p>Discover our curated selection of elegant pieces</p>
        {catFilter && (
          <p className="filter-tag">
            Showing: <span className="filter-value">{catFilter}</span>
          </p>
        )}
      </section>

      {loading ? (
        <div className="loading">
          <div className="loader"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          {usingFallback && (
            <div className="api-notice">
              <p>Showing cached products. Backend at {API_URL} is unreachable.</p>
              <button type="button" className="btn btn-secondary btn-sm" onClick={fetchProducts}>
                Retry
              </button>
            </div>
          )}
          {error && !usingFallback && filteredProducts.length === 0 && (
            <div className="error-message">
              <p>{error}</p>
              <p className="hint">
                Ensure the backend is running and MongoDB is connected.
              </p>
              <button type="button" className="btn btn-primary" onClick={fetchProducts}>
                Retry
              </button>
            </div>
          )}
          {filteredProducts.length === 0 && !loading && !error && (
            <div className="empty-state">
              <p>
                {catFilter
                  ? `No products found for "${catFilter}".`
                  : "No products in stock yet."}
              </p>
              <Link to="/products" className="btn btn-primary">
                View all products
              </Link>
            </div>
          )}
          {filteredProducts.length > 0 && (
            <div className="products-grid">
              {filteredProducts.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
