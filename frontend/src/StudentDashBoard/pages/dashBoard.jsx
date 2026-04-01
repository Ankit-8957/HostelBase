import { Bell, Wallet, FileText, MessageCircle } from "lucide-react";
import "../../css/Dashboard.css";
import { useState, useEffect } from "react";
import api from "../../axios";



const Dashboard = () => {
  const [detail, setDetail] = useState({
    totalNotice: 0,
    totalComplaint: 0,
    totalPayment: 0,
  });
  const [notices, setNotices] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await api.get("/Student/overview");
      setDetail(res.data);
      const noticesRes = await api.get("/recent-notices");
      setNotices(noticesRes.data);
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
          <p>₹ {detail.totalPayment*2000}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Fees</h3>
          <p>₹ {12*2000 - detail.totalPayment*2000}</p>
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
          {notices.length === 0 && <p>No notices found.</p>}
          {notices.map((notice) => (
            <li key={notice._id}>
              <p>{notice.message}</p>
            </li>
          ))}
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
