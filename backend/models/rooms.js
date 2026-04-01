import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNo: {
    type: String,
    required: true,
    trim: true,
  },

  capacity: {
    type: Number,
    required: true,
  },

  occupied: {
    type: Number,
    default: 0,
  },

  hostelId: {
    type: String,
    required: true,
    trim: true,
  },

  status: {
    type: String,
    enum: ["Available", "Partially Filled", "Full"],
    default: "Available",
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner"
  },

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  ],

}, { timestamps: true });


// ✅ 🔥 ADD THIS LINE
roomSchema.index({ roomNo: 1, hostelId: 1 }, { unique: true });


export default mongoose.model("Room", roomSchema);