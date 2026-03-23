import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    hostelId: {
    type: String,
    required: true,
    trim: true,  // ❌ removed unique: true
  },

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

    issue: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Resolved", "Rejected"],
      default: "Pending",
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
