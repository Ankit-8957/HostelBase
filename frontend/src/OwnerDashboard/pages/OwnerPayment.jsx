import { useState, useEffect } from "react";
import "../../css/ownerPayment.css";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import api from "../../axios";

const OwnerPayment = () => {
  const [payments, setPayments] = useState([]);
  const [detail, setDetail] = useState({
     totalPayment: 0,
     totalStudents: 0,
  });

  useEffect(() => {
    const paymentData = async () => {
      try {
        const res = await api.get("/owner/payment");
        const detailRes = await api.get("/dashboard/overview");
        setDetail(detailRes.data);

        // 🔥 Map backend data to UI format
        const formatted = res.data.payments.map((p) => ({
          id: p._id,
          name: p.student?.name || "N/A",
          room: p.room?.roomNo || "N/A",
          amount: p.amount,
          status:
            p.status === "paid"
              ? "Paid"
              : p.status === "created"
                ? "Pending"
                : "Overdue",
          date: new Date(p.updatedAt).toLocaleDateString(),
          month: p.month,
        }));

        setPayments(formatted);

      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    paymentData();
  }, []);

  // 🔥 Summary calculations
  const totalPaid = payments
    .filter((p) => p.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingCount = payments.filter((p) => p.status === "Pending").length;
  const overdueCount = payments.filter((p) => p.status === "Overdue").length;

  return (
    <div className="payment-container">
      <h1>💳 Payment Management</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <CheckCircle size={32} />
          <h3>Total Paid</h3>
          <p>₹ {totalPaid}</p>
        </div>

        <div className="card pending">
          <Calendar size={32} />
          <h3>Pending</h3>
          <p>{12*2000*detail.totalStudents - detail.totalPayment*2000}</p>
        </div>

        <div className="card overdue">
          <XCircle size={32} />
          <h3>Overdue</h3>
          <p>{overdueCount}</p>
        </div>
      </div>

      {/* Table */}
      <table className="payment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Room</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Month</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.room}</td>
              <td>₹ {p.amount}</td>

              <td className={`status ${p.status.toLowerCase()}`}>
                {p.status}
              </td>

              <td>{p.date}</td>
              <td>{p.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerPayment;