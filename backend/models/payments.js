import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  room: {
    type: String,
    required: true,
    trim: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },

  // 🔥 Razorpay fields
  razorpayOrderId: {
    type: String,
  },

  razorpayPaymentId: {
    type: String,
  },

  razorpaySignature: {
    type: String,
  },

  paymentMethod: {
    type: String, // UPI, Card, Netbanking
  },

  paidAt: {
    type: Date,
  },
  month: {
  type: String,
  required: true,
}

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);