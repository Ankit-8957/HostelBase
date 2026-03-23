import { useState, useEffect } from "react";
import axios from "axios";
import "../../css/ownerStudents.css";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getStudents")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="students-container">

      <h1 className="title">Students</h1>

      <div className="students-list">
        {students.map((s) => (
          <div className="student-card-simple" key={s._id}>

            <h3 className="student-name">{s.name}</h3>

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
        ))}

        {students.length === 0 && <p>No students found...</p>}
      </div>

    </div>
  );
};

export default Students;