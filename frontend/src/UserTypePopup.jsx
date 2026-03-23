import "./css/popup.css";

const UserTypePopup = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <h2>Select User Type</h2>

        <div className="popup-buttons">
          <button className="popup-btn student" onClick={() => onSelect("student")}>
            Student
          </button>
          <button className="popup-btn owner" onClick={() => onSelect("owner")}>
            Owner
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypePopup;


