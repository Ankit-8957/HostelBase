import "../css/FeaturesSection.css";

const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2>All-in-One Platform</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🛏️</div>
          <h3>Room & Booking</h3>
          <p>Manage beds, assign rooms, and track availability</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Payments & Billing</h3>
          <p>Automate invoices, collect payments and view financials</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Resident Hub</h3>
          <p>Connect residents, communicate and build community</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
