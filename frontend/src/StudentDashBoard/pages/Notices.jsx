import "../../css/notices.css";
import { Megaphone } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../../axios.js";
import toast from "react-hot-toast";
const Notices = () => {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    let fetchNotice = async () => {
      try {
        let response = await api.get("/notice");
        setNotices(response.data.notices);

      } catch (error) {
        console.error(error);
        toast.error("Something Error");
      }
    }

    fetchNotice();
  }, []);

  return (
    <div className="notice-container">

      {/* Header */}
      <div className="notice-header">
        <h1>Notices</h1>
        <Megaphone size={26} />
      </div>

      {/* Notices List */}
      <div className="notice-list">

        {notices.length === 0 ? (
          <p className="no-notice">No notices available</p>
        ) : (notices.map((notice, index) => (
          <div key={index} className="notice-card">

            <div className="notice-top">
              <h3>{notice.title}</h3>
              <span className={`tag ${notice.type.toLowerCase()}`}>
                {notice.type}
              </span>
            </div>

            <p className="notice-date">Posted on {new Date(notice.date).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</p>

            <p className="notice-msg">{notice.message}</p>

          </div>
        )))}
      </div>

    </div>
  );
};

export default Notices;
