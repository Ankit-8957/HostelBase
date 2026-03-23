import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Wallet,
  Bed,
  Bell,
  FileWarning,
  User,
  Menu,
  LogOut
} from "lucide-react";

import "../../css/ownerSidebar.css";
import api from "../../axios";

export default function OwnerSidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await api.post("/logout");
    navigate("/"); // redirect after logout
  } catch (err) {
    console.error("Logout failed", err);
  }
};
  return (
    <>
      {/* Mobile Hamburger */}
      {isOpen == false && <button className="owner-hamburger" onClick={() => setIsOpen(true)}>
        <Menu size={26} />
      </button>}


      {/* Sidebar */}
      <aside className={`owner-sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="logo">HostelBase</h2>

        <nav>
          <NavLink to="/owner/dashboard" end className="link">
            <Home /> <span>Overview</span>
          </NavLink>

          <NavLink to="/owner/dashboard/students" className="link">
            <Users /> <span>Students</span>
          </NavLink>

          <NavLink to="/owner/dashboard/payments" className="link">
            <Wallet /> <span>Payments</span>
          </NavLink>

          <NavLink to="/owner/dashboard/rooms" className="link">
            <Bed /> <span>Rooms</span>
          </NavLink>

          <NavLink to="/owner/dashboard/complaints" className="link">
            <FileWarning /> <span>Complaints</span>
          </NavLink>

          <NavLink to="/owner/dashboard/notices" className="link">
            <Bell /> <span>Notices</span>
          </NavLink>

          <NavLink to="/owner/dashboard/profile" className="link">
            <User /> <span>Profile</span>
          </NavLink>
        </nav>
        {/* ===== Logout Button ===== */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Close sidebar when clicking outside (mobile) */}
      {isOpen && <div className="owner-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}
