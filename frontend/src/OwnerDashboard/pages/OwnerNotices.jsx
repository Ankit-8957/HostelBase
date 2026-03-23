import { useState, useEffect } from "react";
import { Plus, Trash2, Megaphone } from "lucide-react";
import "../../css/ownerNotices.css";
import api from "../../axios.js";
import toast from "react-hot-toast";

export default function OwnerNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "General",
  });

  const [showForm, setShowForm] = useState(false);

  // ✅ Fetch notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await api.get("/notice");

        // ✅ FIXED: correct response handling
        setNotices(response.data.notices);
      } catch (err) {
        toast.error("Failed to load notices");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // ✅ Add notice
  const addNotice = async () => {
    if (!form.title.trim() || !form.message.trim()) {
      return toast.error("Title and message are required");
    }

    try {
      const response = await api.post("/notice/add", {
        title: form.title,
        message: form.message,
        type: form.type,
        date: new Date(),
      });

      // ✅ Add new notice on top
      setNotices((prev) => [response.data.notice, ...prev]);

      toast.success(
        response.data.message || "Notice published successfully"
      );

      setForm({ title: "", message: "", type: "General" });
      setShowForm(false);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add notice"
      );
    }
  };

  // ✅ Delete notice
  const deleteNotice = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) {
      return;
    }

    try {
      const response = await api.delete(`/notice/${id}`);

      setNotices((prev) => prev.filter((n) => n._id !== id));

      toast.success(response.data.message || "Notice deleted");
    } catch (err) {
      toast.error("Failed to delete notice");
    }
  };

  // ✅ Loading state
  if (loading) {
    return <p className="loading">Loading notices...</p>;
  }

  return (
    <div className="owner-notices-page">
      <div className="top-bar">
        <h1 className="title">Notices</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <Plus size={20} /> Add Notice
        </button>
      </div>

      {/* ✅ Notices */}
      <div className="notices-grid">
        {notices.length === 0 ? (
          <p className="no-notice">No notices available</p>
        ) : (
          notices.map((n) => (
            <div className="notice-card" key={n._id}>
              <div className="card-top">
                <h3>{n.title}</h3>
                <span className={`tag ${n.type.toLowerCase()}`}>
                  {n.type}
                </span>
              </div>

              <p className="msg">{n.message}</p>

              <div className="card-bottom">
                <span className="date">
                  {new Date(n.date || Date.now()).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                <Trash2
                  className="delete-icon"
                  size={20}
                  onClick={() => deleteNotice(n._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✅ Modal */}
      {showForm && (
        <div
          className="notice-modal-overlay"
          onClick={() => setShowForm(false)}
        >
          <div
            className="notice-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add New Notice</h2>

            <label>Title</label>
            <input
              type="text"
              placeholder="Enter notice title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <label>Message</label>
            <textarea
              placeholder="Enter notice message"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />

            <label>Type</label>
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option value="General">General</option>
              <option value="Important">Important</option>
              <option value="Urgent">Urgent</option>
            </select>

            <button className="submit-btn" onClick={addNotice}>
              <Megaphone size={18} /> Publish Notice
            </button>
          </div>
        </div>
      )}
    </div>
  );
}