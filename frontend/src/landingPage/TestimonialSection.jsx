import "../css/TestimonialSection.css";

const TestimonialSection = () => {
  return (
    <section className="testimonial-section">
      <h2>Loved by Hostel Owners</h2>

      <div className="testimonial-card">
        <div className="user-info">
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="Maria"
            className="user-img"
          />
          <div>
            <h3>Maria S.</h3>
            <p className="user-title">Owner, "The Urban Nest"</p>
          </div>
        </div>

        <p className="testimonial-text">
          <strong>HostelBase</strong> simplified our operations! So easy to use
          and our residents love it.
        </p>

        <div className="rating">
          <span className="stars">⭐⭐⭐⭐☆</span>
          <p>Based on 300+ reviews</p>
        </div>

        <button className="join-btn">Join Today</button>
      </div>
    </section>
  );
};

export default TestimonialSection;
