import Complaint from "../models/complaints.js";
import notice from "../models/notice.js";
import Student from "../models/students.js";
import crypto from "crypto";
import Payment from "../models/payments.js";
import { razorpayInstance } from "../server.js";

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

export const getPayments = async (req, res) => {
  try {
    const userId = req.user.id;

    const payments = await Payment.find({
      student: userId,
    });
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { amount, month } = req.body;
    const student = await Student.findById(req.user._id);
    if (!month) {
      return res.status(400).json({ success: false, message: "Month is required" });
    }

    // Create payment doc
    const paymentDoc = await Payment.create({
      student: req.user._id,
      amount,
      month,
      room: student.room,
      status: "created",
    });

    // Create Razorpay order
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpayInstance.orders.create(options);

    // Save order id in payment doc
    paymentDoc.razorpayOrderId = order.id;
    await paymentDoc.save();

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      paymentId: paymentDoc._id, // send _id to frontend (optional)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
export const verifyPayment = async (req, res) => {
  try {


    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Find payment by razorpayOrderId
    const paymentDoc = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
    if (!paymentDoc) {
      return res.status(404).json({ success: false, message: "Payment not found ❌" });
    }

    if (paymentDoc.status === "paid") {
      return res.json({ success: true, message: "Already paid ✅" });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.key_secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      paymentDoc.status = "failed";
      await paymentDoc.save();
      return res.status(400).json({ success: false, message: "Invalid signature ❌" });
    }

    // Mark payment as paid
    paymentDoc.status = "paid";
    paymentDoc.razorpayPaymentId = razorpay_payment_id;
    paymentDoc.razorpaySignature = razorpay_signature;
    paymentDoc.paidAt = new Date();
    await paymentDoc.save();
    return res.json({ success: true, message: "Payment verified successfully ✅", payment: paymentDoc });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error ❌" });
  }
};