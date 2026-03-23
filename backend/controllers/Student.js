import Complaint from "../models/complaints.js";
import notice from "../models/notice.js";
import Student from "../models/students.js";

export const StudentOverview = async (req, res) => {

  let totalNotice = await notice.countDocuments({ hostelId: req.user.hostelId });
  let totalComplaint = await Complaint.countDocuments({
    studentId: req.user._id
  });

  res.json({ totalNotice, totalComplaint });

}

export const myComplaint = async (req, res) => {

  try {
    if (!req.user.room) {
      return res.status(403).json({
        success: false,
        message: "Room not allotted"
      });
    }
    let result = await Complaint.find({ studentName: req.user.name });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const addComplaint = async (req, res) => {
  if (!req.user.room) {
  return res.status(403).json({
    success: false,
    message: "Room not allotted"
  });
}
  const { issue } = req.body;

  if (!issue || issue.trim() === "") {
    return res.status(400).json({ message: "Issue is required" });
  }

  const newComplaint = new Complaint({
    studentId: req.user._id,
    studentName: req.user.name,
    room: req.user.room,
    hostelId: req.user.hostelId,
    issue: issue.trim(),
  });

  await newComplaint.save();

  res.json({
    success: true,
    message: "Complaint added successfully",
    complaint: newComplaint
  });
};
export const Info = async (req, res) => {
  try {
    const info = await Student.findById(req.user.id);
    if (!info) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

export const updateInfo = async (req, res) => {
  try {
    const updateStudent = await Student.findByIdAndUpdate(req.user.id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      course: req.body.course,
      year: req.body.year,
      hostelId: req.body.hostelId,
      room: req.body.room,
      admissionDate: req.body.admissionDate
    }, { new: true });
    res.json(updateStudent);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
}

