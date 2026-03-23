import { useState } from "react";
import OwnerSidebar from "./components/OwnerSidebar";
import "../css/ownerDash.css";

const OwnerDash = ({ children }) => {
   const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="owner-dash-container">
      <OwnerSidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      <main className="owner-main">{children}</main>
    </div>
  );
};

export default OwnerDash;
