function About() {
  return (
    <div className="page about-page">
      <section className="page-hero">
        <h1>About Shreyas Boutique</h1>
        <p>Our story of passion and style</p>
      </section>

      <section className="about-content">
        <div className="about-story-section">
          <div className="about-text">
            <h2>Where Elegance Meets Tradition</h2>
            <p>
              Shreyas Boutique was born from a love for timeless fashion and the desire to bring
              exquisite, thoughtfully crafted clothing to every wardrobe. Founded with a vision to
              make premium ethnic wear accessible, we've grown into a trusted name for those who
              appreciate both tradition and contemporary style.
            </p>
            <p>
              We believe that what you wear should make you feel confident, beautiful, and
              authentically yourself. Every piece in our collection is selected with care,
              balancing contemporary trends with classic sophistication. Whether you're preparing
              for a special occasion or elevating your everyday style, we're here to help you
              find the perfect look.
            </p>
            <p>
              From the finest Banarasi silks to comfortable cotton kurtis, from statement
              lehengas to elegant Indo-western fusion—our curated collection celebrates the
              diversity of Indian fashion while maintaining the highest standards of quality.
            </p>
          </div>
        </div>

        <div className="about-values">
          <h2>What We Stand For</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">✨</div>
              <h4>Quality First</h4>
              <p>We source and curate only the finest materials and craftsmanship. Every stitch, every weave is held to the highest standards.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💝</div>
              <h4>Personal Touch</h4>
              <p>Every customer receives the attention and care they deserve. We're not just selling clothes—we're helping you express yourself.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🌿</div>
              <h4>Sustainability</h4>
              <p>We're committed to mindful fashion that lasts. Quality over quantity, and pieces you'll cherish for years to come.</p>
            </div>
          </div>
        </div>

        <section className="testimonial-section">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"The Banarasi saree I bought was absolutely stunning. The quality exceeded my expectations and I received so many compliments!"</p>
              <p className="testimonial-author">— Priya M., Chennai</p>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"Shreyas Boutique has become my go-to for all occasions. Their kurtis are so comfortable and the designs are always unique."</p>
              <p className="testimonial-author">— Anitha R., Bangalore</p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default About;
