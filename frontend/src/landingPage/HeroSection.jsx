import "../css/HeroSection.css";


const Hero = () => {
  return (
    <section className="hero">
      {/* Left Section */}
      <div className="hero-content">
        <h1>
          Effortless Hostel Management, <br /> Happy Residents
        </h1>
        <p>
          Streamline operations, boost bookings, and create a connected
          community.
        </p>
        <button className="cta-btn">Get Started Free</button>
      </div>

      {/* Right Section */}
      <div className="hero-image">
        <img src="https://img.freepik.com/premium-photo/emotional-group-friends-using-laptop-computers_171337-35316.jpg?semt=ais_hybrid&w=740&q=80" alt="Happy hostel residents" />
      </div>
    </section>
  );
};

export default Hero;
