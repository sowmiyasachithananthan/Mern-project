import { Link, useSearchParams } from "react-router-dom";

function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="page order-success-page">
      <section className="page-hero">
        <div className="success-icon">✓</div>
        <h1>Thank you for your order</h1>
        {orderNumber && <p className="order-number">Order #{orderNumber}</p>}
        <p>We'll send a confirmation to your email shortly.</p>
      </section>
      <div className="success-actions">
        <Link to="/products" className="btn btn-primary">
          Continue shopping
        </Link>
        <Link to="/" className="btn btn-secondary">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
