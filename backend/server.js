import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
// import bodyParser from "body-parser";
import Student from "./models/students.js";
import Owner from "./models/owner.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import ownerRoute from "./routes/owner.js";
import studentRoute from "./routes/student.js";
import authRoute from "./routes/auth.js";
import Razorpay from "razorpay";
import nodemailer from "nodemailer";

// Middlewares
app.use(cors({
  origin: "https://hostel-base.vercel.app",
  credentials: true
}));
// app.use(bodyParser.json());
app.use(express.json());
// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✔ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
  }
}
connectDB();

// Serve React build folder
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.set("trust proxy", 1);

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_URL,
  crypto: {
    secret: process.env.SESSION_SECRET
  },
  touchAfter: 24 * 3600 // 24 hours
});
store.on("error", (err) => {
  console.error("Session Store Error:", err);
});
const sessionOptions = {
  store: store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // secure: process.env.NODE_ENV === "production",
    secure: false,        // MUST be false on localhost
    sameSite: "lax",
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
};


app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, { id: user.id, role: user.role });
});

passport.deserializeUser(async (data, done) => {
  try {

    if (data.role === "Owner") {
      const owner = await Owner.findById(data.id);
      return done(null, owner);
    }

    if (data.role === "Student") {
      const student = await Student.findById(data.id);
      return done(null, student);
    }
    return done(null, false);

  } catch (err) {
    done(err);
  }
});


export const razorpayInstance = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// PASSPORT STRATEGIES
passport.use("student-local",
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const student = await Student.findOne({ email });
      if (!student) return done(null, false, { message: "Student not found" });

      const match = await bcrypt.compare(password, student.password);
      if (!match) return done(null, false, { message: "Incorrect password" });

      student.role = "Student";
      return done(null, student);
    } catch (err) {
      return done(err);
    }
  })
);

passport.use("owner-local",
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      email = email.toLowerCase();
      const owner = await Owner.findOne({ email }).select("+password");
      if (!owner) return done(null, false, { message: "Owner not found" });

      const match = await bcrypt.compare(password, owner.password);
      if (!match) return done(null, false, { message: "Incorrect password" });

      owner.role = "Owner";
      return done(null, owner);
    } catch (err) {
      console.log("STRATEGY ERROR 👉", err);
      return done(err);
    }
  })
);
app.use("/",authRoute);
app.use("/",ownerRoute);
app.use("/",studentRoute);

// Start server
app.listen(8080, () => {
  console.log("🚀 Server running on port 8080");
});
