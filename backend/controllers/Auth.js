import passport from "passport";
import bcrypt from "bcrypt";
import Student from "../models/students.js";
import Owner from "../models/owner.js";


export const OwnerSignup = async (req, res, next) => {
  try {
    let { ownerName, hostelName, phone, email, password } = req.body;

    if (!ownerName || !hostelName || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    email = email.toLowerCase();

    const exists = await Owner.findOne({ email });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOwner = new Owner({
      ownerName,
      hostelName,
      phone,
      email,
      password: hashedPassword,
      role: "Owner" // 🔥 important for your serializeUser
    });

    await newOwner.save();

  
    req.login(newOwner, (err) => {
      if (err) {
        console.error("Login after signup failed:", err);
        return res.status(500).json({
          success: false,
          message: "Signup successful but login failed"
        });
      }

      return res.status(201).json({
        success: true,
        message: "Owner registered & logged in successfully",
        hostelId: newOwner.hostelId
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const Ownerlogin = (req, res, next) => {

  passport.authenticate("owner-local", (err, owner, info) => {
    if (err) {
      console.log("AUTH ERROR 👉", err);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }

    if (!owner) {
      return res.status(401).json({
        success: false,
        message: info.message, // 👈 message from LocalStrategy
      });
    }

    req.login(owner, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Login failed",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Login Successful",
        owner: {
          id: owner._id,
          email: owner.email,
          role: owner.role,
        },
      });
    });
  })(req, res, next);
}

export const StudentSignup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      course,
      year,
      hostelId,
      room,
      admissionDate,
      father,
      parentPhone
    } = req.body;

    const exists = await Student.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const hostelCheck = await Owner.findOne({ hostelId });
    if (!hostelCheck) {
      return res.json({ success: false, message: "Invalid Hostel ID" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      password: hashed,
      phone,
      course,
      year,
      hostelId,
      room,
      admissionDate,
      parents: {
        father,
        phone: parentPhone
      },
      role: "Student" 
    });

    await newStudent.save();

   
    req.login(newStudent, (err) => {
      if (err) {
        console.log("Signup successful but login failed", err);
        return res.status(500).json({
          success: false,
          message: "Signup successful but login failed"
        });
      }

      return res.status(201).json({
        success: true,
        message: "Student registered & logged in successfully"
      });
    });

  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error in registration" });
  }
};

export const StudentLogin = (req, res, next) => {
  passport.authenticate("student-local", (err, student, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }

    if (!student) {
      return res.status(401).json({
        success: false,
        message: info.message, // "Student not found" / "Incorrect password"
      });
    }

    req.login(student, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Login failed",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Student logged in",
        student: {
          id: student._id,
          email: student.email,
          role: student.role,
        },
      });
    });
  })(req, res, next);
}

export const logout = (req, res) => {
  req.logout(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
}