import { useState } from "react";
import "../../css/ownerOverview.css";
import { Users, BedDouble, Wallet, Bell } from "lucide-react";
import { useEffect } from "react";
import api from "../../axios.js";

export default function OwnerOverview() {
  const [detail,setDetail] = useState({
    totalStudents: 0,
    totalRooms: 0,
    occupiedRooms: 0,
    totalComplaint: 0
  });

  useEffect(()=>{
    api.get("/dashboard/overview")
    .then((res)=> setDetail(res.data))
    .catch((err)=> console.log(err));
  },[]);
  return (
    <div className="overview-container">

      {/* Heading */}
      <h1 className="overview-title">Dashboard Overview</h1>
      <p className="overview-subtitle">
        Here’s a quick summary of your hostel’s activities.
      </p>

      {/* STAT CARDS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="icon-box"><Users size={26} /></div>
          <h3>Total Students</h3>
          <p className="stat-value">{detail.totalStudents}</p>
        </div>

        <div className="stat-card">
          <div className="icon-box"><BedDouble size={26} /></div>
          <h3>Occupied Rooms</h3>
          <p className="stat-value">{detail.occupiedRooms} / {detail.totalRooms}</p>
        </div>

        <div className="stat-card">
          <div className="icon-box"><Wallet size={26} /></div>
          <h3>Pending Payments</h3>
          <p className="stat-value">₹ 34,500</p>
        </div>

        <div className="stat-card">
          <div className="icon-box"><Bell size={26} /></div>
          <h3>New Complaints</h3>
          <p className="stat-value">{detail.totalComplaint}</p>
        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="activity-card">
        <h2>Recent Activity</h2>
        <ul>
          <li>🟢 New student registered — Rohan Kumar</li>
          <li>🟡 Complaint raised — Water issue (Block B)</li>
          <li>🔵 Payment received — ₹6500 from Ankit Pandey</li>
          <li>🟢 Room 203 marked as Cleaned</li>
        </ul>
      </div>
    </div>
  );
}
