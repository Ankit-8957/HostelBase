import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ownerSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true
  },
  hostelName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  hostelId: {
    type: String,
    unique: true,
    index: true
  },
  room: {
    type: Number
  },
  role: {
    type: String,
    default: "Owner"
  }
}, { timestamps: true });

ownerSchema.pre("save", function (next) {
  if (!this.hostelId) {
    this.hostelId = "HSTL-" + uuidv4().slice(0, 8).toUpperCase();
  }
  next();
});

export default mongoose.model("Owner", ownerSchema);