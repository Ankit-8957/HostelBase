import { Wallet, CheckCircle, XCircle } from "lucide-react";
import "../../css/payment.css";

const Payments = () => {
  const paymentsData = [
    { month: "January", amount: 5000, status: "Paid" },
    { month: "February", amount: 5000, status: "Paid" },
    { month: "March", amount: 5000, status: "Pending" },
    { month: "April", amount: 5000, status: "Pending" },
    { month: "May", amount: 5000, status: "Paid" },
    { month: "June", amount: 5000, status: "Pending" },
  ];

  return (
    <div className="payment-container">
              

      {/* ===== Header ===== */}
      <div className="payment-header">
        <h1>Payments</h1>
        <Wallet size={26} />
      </div>

      {/* ===== Summary Cards ===== */}
      <div className="payment-summary">

        <div className="summary-card paid-box">
          <h3>Total Paid</h3>
          <p>₹ 15,000</p>
        </div>

        <div className="summary-card pending-box">
          <h3>Total Pending</h3>
          <p>₹ 10,000</p>
        </div>

      </div>

      {/* ===== Monthly Payments Table ===== */}
      <div className="payments-table">
        <h2>Monthly Payment History</h2>

        {paymentsData.map((entry, index) => (
          <div key={index} className="payment-row">

            <div className="payment-left">
              <h4>{entry.month}</h4>
              <p>₹ {entry.amount}</p>
            </div>

            <div className="payment-right">
              {entry.status === "Paid" ? (
                <span className="paid-status">
                  <CheckCircle size={20} /> Paid
                </span>
              ) : (
                <button className="pay-btn">
                  <XCircle size={20} /> Pay Now
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Payments;
