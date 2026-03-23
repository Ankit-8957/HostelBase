import mongoose from "mongoose";

const parentSchema = new mongoose.Schema({
  father: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  }
}, { _id: false });

const studentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  },

  phone: {
    type: String,
    required: true,
    trim: true,
  },

  course: {
    type: String,
    required: true,
    trim: true,
  },

  year: {
    type: String,
    required: true,
    trim: true,
  },

  hostelId: {
    type: String,
    required: true,
    trim: true,  // ❌ removed unique: true
  },

  room: {
    type: String,
    trim: true,
  },

  admissionDate: {
    type: String,
    required: true,
    trim: true,
  },

  parents: {
    type: parentSchema,
    default: null,
  },
  role: {
    type: String,
    default: "Student"
  },

}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
