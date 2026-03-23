import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, Home, Bell, Wallet, MessageCircle, User, LogOut } from "lucide-react";
import "../../css/Sidebar.css";
import api from "../../axios";
import toast from "react-hot-toast";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const closeSidebar = () => setIsOpen(false);

  // ✅ Fetch student info
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get("/student/info");
        setStudent(res.data); // ⚠️ change to res.data.data if needed
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  // 🔥 SKELETON LOADER
  if (loading) {
    return (
      <aside className="sidebar open">
        <div className="skeleton-container">

          <div className="skeleton skeleton-logo"></div>

          {[1, 2, 3, 4, 5].map((item) => (
            <div className="skeleton-row" key={item}>
              <div className="skeleton skeleton-icon"></div>
              <div className="skeleton skeleton-link"></div>
            </div>
          ))}

        </div>
      </aside>
    );
  }

  
  const isRoomAllotted = !!student?.room;
  

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // 🔒 Block click if no room
  const handleBlockedClick = (e) => {
    if (!isRoomAllotted) {
      e.preventDefault();
      toast.error("Room not allotted yet!");
    }
  };

  return (
    <>
      {/* Hamburger */}
      {!isOpen && (
        <div className="hamburger" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </div>
      )}

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="logo">HostelBase</h2>

        <nav className="nav-links">

          {/* Dashboard */}
          <NavLink to="/student/dashboard" end className="link" onClick={closeSidebar}>
            <Home size={20} /> <span>Dashboard</span>
          </NavLink>

          {/* Payments */}
          <NavLink
            to="/student/dashboard/payments"
            className={`link ${!isRoomAllotted ? "disabled" : ""}`}
            onClick={(e) => {
              handleBlockedClick(e);
              closeSidebar();
            }}
          >
            <Wallet size={20} /> <span>Payments</span>
          </NavLink>

          {/* Notices */}
          <NavLink
            to="/student/dashboard/notices"
            className={`link ${!isRoomAllotted ? "disabled" : ""}`}
            onClick={(e) => {
              handleBlockedClick(e);
              closeSidebar();
            }}
          >
            <Bell size={20} /> <span>Notices</span>
          </NavLink>

          {/* Complaints */}
          <NavLink
            to="/student/dashboard/complaints"
            className={`link ${!isRoomAllotted ? "disabled" : ""}`}
            onClick={(e) => {
              handleBlockedClick(e);
              closeSidebar();
            }}
          >
            <MessageCircle size={20} /> <span>Complaints</span>
          </NavLink>

          {/* Profile */}
          <NavLink to="/student/dashboard/profile" className="link" onClick={closeSidebar}>
            <User size={20} /> <span>Profile</span>
          </NavLink>

        </nav>

        {/* Logout */}
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;