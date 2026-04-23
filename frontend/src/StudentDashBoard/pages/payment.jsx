import { useEffect, useState } from "react";
import { Wallet, CheckCircle, XCircle } from "lucide-react";
import api from "../../axios.js";
import "../../css/payment.css";
import toast from "react-hot-toast";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Reusable fetch
  const fetchPayments = async () => {
    try {
      const res = await api.get("/payments");
      setPayments(res.data);
    } catch (err) {
      console.error("Fetch payments failed:", err);
      toast.error("Failed to load payments ❌");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Merge months
  const mergedPayments = months.map((month) => {
    const found = payments.find((p) => p.month === month);
    return found || { month, amount: 2000, status: "pending", _id: null };
  });

  const handlePayment = async (entry) => {
    try {
      setLoadingId(entry.month);

      // 1️⃣ Create order
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

        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true
        },

        handler: async function (response) {
          try {
            // 3️⃣ Verify payment
            await api.post("/verify-payment", {
              ...response,
              month: entry.month,
            });

            // ✅ Toast instead of alert
            toast.success(`${entry.month} payment successful ✅`);

            // ⚡ Optimistic update
            setPayments((prev) =>
              prev.map((p) =>
                p.month === entry.month
                  ? { ...p, status: "paid", paidAt: new Date() }
                  : p
              )
            );

            // 🔄 Sync with backend
            await fetchPayments();

          } catch (err) {
            console.error("Payment verification failed:", err);
            toast.error("Payment verification failed ❌");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Order creation failed:", err);
      toast.error("Unable to process payment ❌");
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