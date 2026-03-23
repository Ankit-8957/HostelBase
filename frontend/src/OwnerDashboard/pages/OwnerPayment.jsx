import { useState } from "react";
import "../../css/ownerPayment.css";
import { Calendar, CheckCircle, XCircle, IndianRupee } from "lucide-react";

const OwnerPayment = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Verma", room: "A-102", amount: 2500, status: "Paid", date: "2025-11-01" },
    { id: 2, name: "Ankit Singh", room: "A-105", amount: 2500, status: "Pending", date: "2025-11-05" },
    { id: 3, name: "Vikas Sharma", room: "B-203", amount: 2500, status: "Overdue", date: "2025-10-28" },
  ]);

  return (
    <div className="payment-container">
      <h1>💳 Payment Management</h1>

      {/* Payment Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <CheckCircle size={32} />
          <h3>Total Paid</h3>
          <p>₹ {students.filter(s => s.status === "Paid").length * 2500}</p>
        </div>

        <div className="card pending">
          <Calendar size={32} />
          <h3>Pending</h3>
          <p>{students.filter(s => s.status === "Pending").length}</p>
        </div>

        <div className="card overdue">
          <XCircle size={32} />
          <h3>Overdue</h3>
          <p>{students.filter(s => s.status === "Overdue").length}</p>
        </div>
      </div>

      {/* Student Payment Table */}
      <table className="payment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Room</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Last Paid</th>
          </tr>
        </thead>

        <tbody>
          {students.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.name}</td>
              <td>{stu.room}</td>
              <td>₹ {stu.amount}</td>

              <td className={`status ${stu.status.toLowerCase()}`}>
                {stu.status}
              </td>

              <td>{stu.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerPayment;
