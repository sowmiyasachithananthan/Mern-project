function FAQ() {
  const faqs = [
    { q: "What payment methods do you accept?", a: "We accept cash, UPI, credit/debit cards, and net banking. Payment is collected at the time of order or in-store." },
    { q: "How long does delivery take?", a: "Within Chennai: 2-3 days. Other cities: 5-7 business days. Custom orders may take 2-3 weeks." },
    { q: "Can I try items before buying?", a: "Yes! Visit our store at T. Nagar, Chennai. We also offer video call consultations for outstation customers." },
    { q: "Do you offer alterations?", a: "Yes, minor alterations are complimentary. Extensive alterations may incur a small charge." },
    { q: "How do I care for my outfit?", a: "Care instructions are provided with each purchase. Silk and delicate fabrics should be dry-cleaned." }
  ];

  return (
    <div className="page faq-page">
      <section className="page-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Quick answers to common questions</p>
      </section>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className="faq-item">
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
