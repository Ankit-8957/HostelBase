import Complaint from "../models/complaints.js";
import Notice from "../models/notice.js"
import rooms from "../models/rooms.js";
import { sendNoticeEmail } from "../utils/sendEmail.js";
import Student from "../models/students.js";
import Owner from "../models/owner.js";
import Payment from "../models/payments.js";


export const overview = async (req, res) => {
  const hostelId = req.user.hostelId;

  const totalStudents = await Student.countDocuments({ hostelId });
  const totalRooms = await rooms.countDocuments({ hostelId });
  const occupiedRooms = await rooms.countDocuments({
    hostelId,
    occupied: { $gt: 0 },
  });
  const totalComplaint = await Complaint.countDocuments({ hostelId });
  const totalPayment = await Payment.countDocuments({hostelId});

  res.json({ totalStudents, totalRooms, occupiedRooms, totalComplaint, totalPayment });
}

export const recentComplaints = async (req, res) => {
  const hostelId = req.user.hostelId;
  const complaints = await Complaint.find({ hostelId }).sort({ createdAt: -1 }).limit(4);
  res.json(complaints);
}

export const getStudents = async (req, res) => {
  let allStudents = await Student.find({ hostelId: req.user.hostelId });
  res.json(allStudents);
}

export const room = async (req, res) => {
  let allRooms = await rooms.find({ hostelId: req.user.hostelId }).populate("students");
  res.json(allRooms);
}

export const addRoom = async (req, res) => {
  try {
    let { roomNo, capacity, students = [] } = req.body;

    // ✅ Validation
    if (!roomNo || !capacity) {
      return res.status(400).json({ message: "Room number and capacity are required" });
    }

    capacity = Number(capacity);

    if (isNaN(capacity) || capacity <= 0) {
      return res.status(400).json({ message: "Invalid capacity" });
    }

    // // ✅ Prevent overflow
    // if (students.length > capacity) {
    //   return res.status(400).json({
    //     message: "Students exceed room capacity"
    //   });
    // }

    const occupied = students.length;

    // ✅ Status logic
    let status = "Available";
    if (occupied === capacity) status = "Full";
    else if (occupied > 0) status = "Partially Filled";

    const newRoom = new rooms({
      roomNo,
      capacity,
      occupied,
      status,
      students,
      hostelId: req.user.hostelId,
    });

    await newRoom.save();

    // if (students.length > 0) {
    //   await Student.updateMany(
    //     { _id: { $in: students } },
    //     { $set: { room: roomNo } } // ✅ assign room
    //   );
    // }


    res.status(201).json({
      success: true,
      message: "Room added successfully",
      room: newRoom,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

export const assignRoom = async (req, res) => {
  try {
    const { studentIds, roomId } = req.body;

    // ❌ Validation
    if (!studentIds || studentIds.length === 0 || !roomId) {
      return res.status(400).json({
        success: false,
        message: "Students and room are required ❌",
      });
    }

    // 🔍 Find Room
    const room = await rooms.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found ❌",
      });
    }

    // 🔢 Current occupancy
    const currentCount = room.students.length;

    // ❌ Capacity check
    if (currentCount + studentIds.length > room.capacity) {
      return res.status(400).json({
        success: false,
        message: "Room capacity exceeded ❌",
      });
    }

    // 🔍 Fetch students
    const students = await Student.find({
      _id: { $in: studentIds },
    });

    if (students.length !== studentIds.length) {
      return res.status(404).json({
        success: false,
        message: "Some students not found ❌",
      });
    }

    // 🚫 Prevent duplicate assignment
    const alreadyAssigned = students.filter((s) => s.room);

    if (alreadyAssigned.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some students already have a room ❌",
      });
    }

    // ✅ Assign students to room
    for (let student of students) {
      student.room = roomId;
      await student.save();
    }

    // ✅ Add students to room
    room.students.push(...studentIds);
    room.occupied = room.students.length;
    await room.save();

    return res.status(200).json({
      success: true,
      message: "Room assigned successfully ✅",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error ❌",
    });
  }
};

export const complaint = async (req, res) => {

  let result = await Complaint.find({ hostelId: req.user.hostelId });
  res.json(result);
}

export const deleteComplaint = async (req, res) => {
  try {

    if (req.user.role !== "Owner") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;

    const complaint = await Complaint.findById(req.params.id);


    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }


    if (complaint.hostelId.toString() !== req.user.hostelId.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }


    const validStatus = ["Pending", "In Progress", "Resolved", "Rejected"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }


    if (status === "Resolved" || status === "Rejected") {
      await Complaint.findByIdAndDelete(req.params.id);
      return res.json({ message: `Complaint ${status} and deleted` });
    }


    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      complaint: updatedComplaint
    });

  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const myInfo = async (req, res) => {
  try {
    const info = await Owner.findById(req.user.id);

    if (!info) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.json(info);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
}

export const updateOwner = async (req, res) => {
  try {

    const updatedOwner = await Owner.findByIdAndUpdate(
      req.user.id,
      {
        ownerName: req.body.ownerName,
        email: req.body.email,
        phone: req.body.phone,
        hostelName: req.body.hostelName
      },
      { new: true }
    );

    res.json(updatedOwner);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
}

export const notice = async (req, res) => {
  const result = await Notice.find({
    hostelId: req.user.hostelId
  });

  res.json({
    success: true,
    notices: result
  });
};

export const addNotice = async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, message, type, date } = req.body;

    if (!title || !message || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const students = await Student.find({
      hostelId: req.user.hostelId
    });

    const emails = students.map(s => s.email);

    const newNotice = new Notice({
      title,
      message,
      type,
      date: date || new Date(),
      hostelId: req.user.hostelId
    });

    await newNotice.save();

    res.json({
      success: true,
      message: "Notice saved. Emails will be sent shortly",
      notice: newNotice
    });

    // ✅ Background task
    if (emails.length > 0) {
      setTimeout(async () => {
        try {
          await sendNoticeEmail(emails, title, message);
        } catch (err) {
          console.error("Email sending failed:", err);
        }
      }, 2000);
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save notice" });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const deletedNotice = await Notice.findByIdAndDelete(req.params.id);

    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({ message: "Notice has been deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export const ownerPayment = async (req, res) => {
  try {
    const paymentList = await Payment.find({ hostelId: req.user.hostelId }).populate("room")
      .populate("student", "name email");;
    res.json({ success: true, payments: paymentList });
  } catch (error) {
    console.log("Owner Payment error: ", error);
    res.status(500).json({ message: "Something went wrong" });
  }

}

