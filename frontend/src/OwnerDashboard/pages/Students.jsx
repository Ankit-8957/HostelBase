import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/ownerStudents.css";
import api from "../../axios.js";


const getPaymentStatus = (studentId, lastPaidMap, dueDate) => {
  const lastPaidDate = lastPaidMap?.[studentId];
  const today = new Date();
  const due = new Date(dueDate);

  if (lastPaidDate && new Date(lastPaidDate) >= due) return "PAID";

  const threeDaysFromNow = new Date(today);
  threeDaysFromNow.setDate(today.getDate() + 3);
  if (due >= today && due <= threeDaysFromNow) return "DUE_SOON";

  return "OVERDUE";
};

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

// ─── Component ────────────────────────────────────────────────────────────────
const Students = () => {
  const [students, setStudents] = useState([]);
  const [lastPaidMap, setLastPaidMap] = useState({});
  const [dueDate, setDueDate] = useState(null);

  useEffect(() => {
    // Fetch students
    axios
      .get("http://localhost:8080/getStudents")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));

    // Fetch payment statuses
    api
      .get("/paymentStatus")
      .then((res) => {
        if (res.data?.success) {
          setLastPaidMap(res.data.lastPaidMap);
          setDueDate(res.data.dueDate);
        }
      })
      .catch((err) => console.log("Payment status error:", err));
  }, []);

  return (
    <div className="students-container">

      <h1 className="title">Students</h1>

      <div className="students-list">
        {students.map((s) => {
          const status = dueDate
            ? getPaymentStatus(s._id, lastPaidMap, dueDate)
            : null;

          return (
            <div className="student-card-simple" key={s._id}>

              {/* Name row with payment dot */}
              <div className="student-name-row">
                <h3 className="student-name">{s.name}</h3>
                {status && (
                  <span
                    className={DOT_CLASS[status]}
                    title={`Rent: ${DOT_LABEL[status]}`}
                  />
                )}
              </div>

              <div className="info-box">
                <p><strong>ID:</strong> {s.hostelId}</p>
                <p><strong>Phone:</strong> {s.phone}</p>
                <p><strong>Room:</strong> {s.room}</p>
                <p><strong>Course:</strong> {s.course}</p>
                <p><strong>Year:</strong> {s.year}</p>
                <p><strong>Admission:</strong> {s.admissionDate}</p>
              </div>

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
