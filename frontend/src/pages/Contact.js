import { useState } from "react";
import { API_URL } from "../config";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus({ type: "success", msg: "Thank you! We'll get back to you soon." });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", msg: data.message || "Something went wrong." });
      }
    } catch {
      setStatus({ type: "error", msg: "Could not send. Is the backend running?" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page contact-page">
      <section className="page-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Visit us, call us, or send a message!</p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p className="contact-intro">
            Whether you have a question about our collections, need help finding the perfect outfit,
            or want to schedule a personal styling session—we're here to help.
          </p>
          <div className="contact-item">
            <span className="contact-label">📍 Visit Our Store</span>
            <p>123 Fashion Street, T. Nagar<br />Chennai, Tamil Nadu 600017</p>
          </div>
          <div className="contact-item">
            <span className="contact-label">📧 Email</span>
            <p>hello@shreyasboutique.com</p>
            <p className="contact-note">We respond within 24 hours</p>
          </div>
          <div className="contact-item">
            <span className="contact-label">📞 Phone</span>
            <p>+91 98765 43210</p>
            <p>+91 91234 56789</p>
          </div>
          <div className="contact-item">
            <span className="contact-label">🕐 Store Hours</span>
            <p>Monday - Saturday: 10:00 AM - 8:00 PM</p>
            <p>Sunday: 11:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <h2>Send a Message</h2>
          <p className="form-intro">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
          {status && (
            <div className={`form-status ${status.type}`}>
              {status.msg}
            </div>
          )}
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
