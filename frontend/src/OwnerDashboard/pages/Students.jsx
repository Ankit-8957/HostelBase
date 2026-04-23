import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/ownerStudents.css";
import api from "../../axios.js";

// Dot styles
const DOT_CLASS = {
  PAID: "payment-dot paid",
  DUE_SOON: "payment-dot due-soon",
  OVERDUE: "payment-dot overdue",
};

const DOT_LABEL = {
  PAID: "Paid",
  DUE_SOON: "Due Soon",
  OVERDUE: "Overdue",
};

const Students = () => {
  const [students, setStudents] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    // Fetch students
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getStudents");
        setStudents(res.data);
      } catch (err) {
        console.log("Student fetch error:", err);
      }
    };

    // Fetch payment status
    const fetchStatus = async () => {
      try {
        const res = await api.get("/paymentStatus");
        if (res.data?.success) {
          setStatusMap(res.data.statusMap);
        }
      } catch (err) {
        console.log("Payment status error:", err);
      }
    };

    fetchStudents();
    fetchStatus();
  }, []);

  return (
    <div className="students-container">
      <h1 className="title">Students</h1>

      <div className="students-list">
        {students.map((s) => {
          // Default = OVERDUE if not found
          const status = statusMap[s._id] || "OVERDUE";

          return (
            <div className="student-card-simple" key={s._id}>
              
              {/* Name + Payment Dot */}
              <div className="student-name-row">
                <h3 className="student-name">{s.name}</h3>

                <span
                  className={DOT_CLASS[status]}
                  title={`Rent: ${DOT_LABEL[status]}`}
                />
              </div>

              {/* Student Info */}
              <div className="info-box">
                <p><strong>ID:</strong> {s.hostelId}</p>
                <p><strong>Phone:</strong> {s.phone}</p>
                <p><strong>Room:</strong> {s.room}</p>
                <p><strong>Course:</strong> {s.course}</p>
                <p><strong>Year:</strong> {s.year}</p>
                <p><strong>Admission:</strong> {s.admissionDate}</p>
              </div>

              {/* Parent Info */}
              <div className="parent-box">
                <h4>Parent Details</h4>
                {s.parents ? (
                  <>
                    <p><strong>Father:</strong> {s.parents.father}</p>
                    <p><strong>Phone:</strong> {s.parents.phone}</p>
                  </>
                ) : (
                  <p className="no-parent">No parent details added</p>
                )}
              </div>
            </div>
          );
        })}

        {students.length === 0 && <p>No students found...</p>}
      </div>
    </div>
  );
};

export default Students;