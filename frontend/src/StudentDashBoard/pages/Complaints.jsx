import { useState, useEffect } from "react";
import "../../css/Complaints.css";
import api from "../../axios.js";
import toast from "react-hot-toast";

export default function Complaints() {
  const [activeTab, setActiveTab] = useState("raise");
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    issue: "",
  });

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/my-complaint");
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load complaints ❌");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/complaint/add", formData);

      toast.success("Complaint submitted successfully ✅");

      setFormData({ issue: "" });

      // optional: refresh list
      fetchComplaints();

    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong ❌"
      );
    }
  };

  return (
    <div className="complaint-container">
      <h1>Complaints</h1>

      {/* Tabs */}
      <div className="complaint-tabs">
        <button
          className={activeTab === "raise" ? "active" : ""}
          onClick={() => setActiveTab("raise")}
        >
          Raise Complaint
        </button>

        <button
          className={activeTab === "list" ? "active" : ""}
          onClick={() => setActiveTab("list")}
        >
          My Complaints
        </button>
      </div>

      {/* Raise Complaint */}
      {activeTab === "raise" && (
        <form className="complaint-form" onSubmit={handleSubmit}>
          <label>Description</label>

          <textarea
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            placeholder="Describe your issue..."
            required
          ></textarea>

          <button type="submit">Submit Complaint</button>
        </form>
      )}

      {/* Complaint List */}
      {activeTab === "list" && (
        <div className="complaint-list">
          {complaints.length === 0 ? (
            <p>No complaints submitted yet.</p>
          ) : (
            complaints.map((c) => (
              <div className="complaint-card" key={c._id}>
                <p>{c.issue}</p>

                <div className="complaint-footer">
                  <span>
                    Date:{" "}
                    {new Date(c.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>

                  <span className={`status ${c.status.toLowerCase()}`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}