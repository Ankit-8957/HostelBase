import { Bell, Wallet, FileText, MessageCircle } from "lucide-react";
import "../../css/Dashboard.css";
import { useState, useEffect } from "react";
import api from "../../axios";



const Dashboard = () => {
  const [detail, setDetail] = useState({
    totalNotice: 0,
    totalComplaint: 0
  });

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await api.get("/Student/overview");
      setDetail(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchData();
}, []);
  return (
    <div className="dashboard-container">

      {/* ==== Top Section ==== */}
      <header className="dashboard-header">
        <h1>Welcome Back, Student 👋</h1>
        <button className="notify-btn">
          <Bell size={22} />
        </button>
      </header>

      {/* ==== Stats Cards ==== */}
      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Fees Paid</h3>
          <p>₹ 45,000</p>
        </div>

        <div className="stat-card">
          <h3>Pending Fees</h3>
          <p>₹ 5,000</p>
        </div>

        <div className="stat-card">
          <h3>Notices</h3>
          <p>{detail.totalNotice}</p>
        </div>

        <div className="stat-card">
          <h3>Complaints Filed</h3>
          <p>{detail.totalComplaint}</p>
        </div>
      </div>

      {/* ==== Recent Notices Section ==== */}
      <div className="section">
        <h2>Recent Notices</h2>
        <ul className="notice-list">
          <li>🔹 Mess will be closed on Sunday.</li>
          <li>🔹 Water supply maintenance at 6 PM.</li>
          <li>🔹 Hostel cleaning on Friday.</li>
        </ul>
      </div>

      {/* ==== Quick Actions ==== */}
      <div className="section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">

          <button className="quick-btn">
            <Wallet size={20} /> Pay Fees
          </button>

          <button className="quick-btn">
            <MessageCircle size={20} /> File Complaint
          </button>

          <button className="quick-btn">
            <FileText size={20} /> View Notices
          </button>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
