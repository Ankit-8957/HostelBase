import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  message: {
    type: String,
    required: true,
    trim: true,
  },

  date: {
    type: Date,
    required: true,
  },

  type: {
    type: String,
    enum: ["General", "Important", "Urgent"],
    default: "General",
  },
  hostelId: {
    type: String,
    required: true,
    trim: true,  // ❌ removed unique: true
  },

}, { timestamps: true });

export default mongoose.model("Notice", noticeSchema);
