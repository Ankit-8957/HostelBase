import "./contact.css";
import Navbar from "../../Navbar";
import Footer from "../../footer";
const ContactPage = () => {
  return (<>
  <Navbar/>
    
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’re here to help! Reach out for support, partnership, or general queries.</p>
      </section>

      {/* MAIN CONTACT WRAPPER */}
      <section className="contact-wrapper">

        {/* CONTACT INFORMATION CARDS */}
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

        {/* CONTACT FORM */}
        <div className="contact-form">
          <h2>Send Us a Message</h2>

          <form>
            <div className="form-row">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>

            <input type="text" placeholder="Subject" className="full-input" required />
            <textarea placeholder="Your Message" required></textarea>

            <button className="send-btn">Send Message</button>
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
    <Footer/>
    </>
  );
};

export default ContactPage;
