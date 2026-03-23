import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true,
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
    enum: ["Paid", "Pending", "Overdue"],
    default: "Pending",
  },

  date: {
    type: Date,
    required: true,
  },

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
