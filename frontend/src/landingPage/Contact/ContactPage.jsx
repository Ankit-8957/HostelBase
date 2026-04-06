import "./contact.css";
import Navbar from "../../Navbar";
import Footer from "../../footer";
import { useState } from "react";
import api from "../../axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await api.post("/contact", formData);

      const data = res.data;

      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("❌ Failed to send message");
      }
    } catch (err) {
      console.log(err);
      setStatus("❌ Something went wrong");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div className="contact-page">

        {/* HERO */}
        <section className="contact-hero">
          <h1>Contact Us</h1>
          <p>We’re here to help! Reach out for support, partnership, or general queries.</p>
        </section>

        {/* MAIN CONTACT */}
        <section className="contact-wrapper">

          {/* INFO */}
          <div className="contact-info">

            <div className="info-card">
              <span className="icon">📧</span>
              <h3>Email Support</h3>
              <p>support@hostelbase.com</p>
            </div>

            <div className="info-card">
              <span className="icon">📞</span>
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
            </div>

            <div className="info-card">
              <span className="icon">📍</span>
              <h3>Head Office</h3>
              <p>Lucknow, Uttar Pradesh</p>
            </div>
          </div>

          {/* FORM */}
          <div className="contact-form">
            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your Name"
                  required
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>

              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subject"
                className="full-input"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
              ></textarea>

              <button
                type="submit"
                className="send-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* STATUS MESSAGE */}
              {status && <p className="status-msg">{status}</p>}
            </form>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>

          <div className="faq-container">
            <details>
              <summary>How can I report an issue?</summary>
              <p>You can report any hostel issue through your dashboard complaint section.</p>
            </details>

            <details>
              <summary>Can I update my profile information?</summary>
              <p>Yes! You can update all your details in the Profile section inside your dashboard.</p>
            </details>

            <details>
              <summary>How do I track my payments?</summary>
              <p>Use the payments section to see dues and previous transactions.</p>
            </details>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
};

export default ContactPage;