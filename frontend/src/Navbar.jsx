import { useState } from "react";
import "./css/Navbar.css";
import { useNavigate,Link } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import UserTypePopup from "./UserTypePopup";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const navigate = useNavigate();

  const handleActionClick = (action) => {
    setCurrentAction(action);
    setIsPopupOpen(true);
  };
  const handleSelectUser = (userType) => {
    setIsPopupOpen(false);
    navigate(`/${userType}/${currentAction}`); // e.g., /login/student or /signup/owner
  };

  return (
    <nav className="navbar">
      {/* Left Section - Logo */}
      <Link to="/" className="navbar-logo">
        <HouseIcon />
        <h2>HostelBase</h2>
      </Link>

      {/* Hamburger Icon (only on mobile) */}
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </div>

      {/* Middle Section - Links */}
      <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
        <li><a href="/features">Features</a></li>
        <li><a href="/solution">Solution</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      {/* Right Section - Buttons */}
      <div className={`navbar-buttons ${isOpen ? "active" : ""}`}>
        <Button variant="outlined" className="login-btn" onClick={() => handleActionClick("login")}>Log in</Button>
        <Button variant="contained" className="signup-btn" onClick={() => handleActionClick("signup")}>Sign up</Button>
      </div>
      {/* Popup component */}
      <UserTypePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSelect={handleSelectUser}
      />
    </nav>
  );
};

export default Navbar;
