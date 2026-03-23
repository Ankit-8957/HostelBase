import "../css/SetupSteps.css";

const SetupSection = () => {
  return (
    <div className="setup-container">
      <h2>Simple Setup, Powerful Results</h2>
      <div className="steps">
        <div className="step">
          <div className="icon">👤</div>
          <div>
            <h3>Create Account</h3>
            <p>Sign up in seconds</p>
          </div>
        </div>

        <div className="step">
          <div className="icon">🏠</div>
          <div>
            <h3>Add Rooms</h3>
            <p>Map your hostel layout</p>
          </div>
        </div>

        <div className="step">
          <div className="icon">🚀</div>
          <div>
            <h3>Go Live!</h3>
            <p>Start managing instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupSection;
