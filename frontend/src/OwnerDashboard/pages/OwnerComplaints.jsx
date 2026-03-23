import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import "../../css/ownerComplaints.css";
import toast from "react-hot-toast";
import api from "../../axios";

export default function OwnerComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const response = await api.get("/complaint");

        setComplaints(response.data || []);

        // ✅ Toast success
        if ((response.data || []).length === 0) {
          toast("No complaints found");
        } else {
          toast.success("Complaints loaded");
        }

      } catch (err) {
        console.log(err);
        toast.error(
          err.response?.data?.message || "Failed to load complaints"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // ✅ Update status
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await api.patch(`/complaint/${id}`, {
        status: newStatus,
      });

      if (response.data.message) {
        toast.success(response.data.message);

        // remove complaint
        setComplaints((prev) => prev.filter((c) => c._id !== id));
      } else {
        // update complaint
        setComplaints((prev) =>
          prev.map((c) =>
            c._id === id ? response.data : c
          )
        );

        toast.success(`Status updated to ${response.data.status}`);
      }

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update complaint"
      );
    }
  };

  return (
    <div className="owner-complaints-page">
      <h1 className="title">Student Complaints</h1>

      {/* ✅ Loading */}
      {loading && <p className="loading">Loading complaints...</p>}

      {/* ✅ No complaints */}
      {!loading && complaints.length === 0 && (
        <p className="empty">No complaints found</p>
      )}

      <div className="complaints-wrapper">
        {complaints.map((c) => (
          <div key={c._id} className="complaint-card">

            <div className="top">
              <h3>{c.issue}</h3>
              <span className={`status ${c.status.toLowerCase().replace(/\s+/g, "-")}`}>
                {c.status}
              </span>
            </div>

            <p><strong>Student:</strong> {c.studentName}</p>
            <p><strong>Room:</strong> {c.room}</p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(c.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            <div className="actions">
              <button
                className="btn resolve"
                onClick={() => updateStatus(c._id, "Resolved")}
              >
                <CheckCircle size={18} /> Resolve
              </button>

              <button
                className="btn progress"
                onClick={() => updateStatus(c._id, "In Progress")}
              >
                <AlertTriangle size={18} /> In Progress
              </button>

              <button
                className="btn reject"
                onClick={() => updateStatus(c._id, "Rejected")}
              >
                <XCircle size={18} /> Reject
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}