import { useEffect, useState } from "react";
import { Wallet, CheckCircle, XCircle } from "lucide-react";
import api from "../../axios.js";
import "../../css/payment.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Fetch existing payments from backend
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/payments");
        setPayments(res.data);
      } catch (err) {
        console.error("Fetch payments failed:", err);
      }
    };
    fetchPayments();
  }, []);

  // Merge months + payments
  const mergedPayments = months.map((month) => {
    const found = payments.find((p) => p.month === month);
    return found || { month, amount: 2000, status: "pending", _id: null };
  });

  // Payment handler
  const handlePayment = async (entry) => {
    try {
      setLoadingId(entry.month);

      // 1️⃣ Create order on backend
      const { data } = await api.post("/create-order", {
        amount: entry.amount,
        month: entry.month,
      });

      // 2️⃣ Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "HostelBase",
        order_id: data.orderId,

        handler: async function (response) {
          try {
            // 3️⃣ Verify payment on backend
            await api.post("/verify-payment", {
              ...response,
              month: entry.month,
            });

            alert(`${entry.month} Payment Successful ✅`);

            // Update UI
            setPayments((prev) => [
              ...prev,
              { month: entry.month, amount: entry.amount, status: "paid" },
            ]);
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed ❌");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Order creation failed:", err);
      alert("Unable to process payment ❌");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Monthly Rent</h1>
        <Wallet />
      </div>

      {mergedPayments.map((entry) => (
        <div key={entry.month} className="payment-row">
          <div>
            <h4>{entry.month}</h4>
            <p>₹ {entry.amount}</p>
          </div>

          <div>
            {entry.status === "paid" ? (
              <span className="paid-status">
                <CheckCircle /> Paid
              </span>
            ) : (
              <button
                className="pay-btn"
                disabled={loadingId === entry.month}
                onClick={() => handlePayment(entry)}
              >
                <XCircle />
                {loadingId === entry.month ? "Processing..." : "Pay Now"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Payments;