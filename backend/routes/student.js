import express from "express";
const router = express.Router();
import { isLoggedIn, isStudent } from "../middleware.js";
import { addComplaint, myComplaint , Info, updateInfo, StudentOverview, createOrder, verifyPayment, getPayments } from "../controllers/Student.js";
import { complaint } from "../controllers/Owner.js";

router.get("/Student/overview",isLoggedIn, asyncWrap(StudentOverview));
router.get("/complaint",isLoggedIn, asyncWrap(complaint));
router.post("/complaint/add",isLoggedIn, isStudent, asyncWrap(addComplaint));
router.get("/my-complaint",isLoggedIn, isStudent, asyncWrap(myComplaint));
router.get("/student/info", isStudent, asyncWrap(Info));
router.get("/payments", isStudent, asyncWrap(getPayments));
router.put("/student/updateInfo",isLoggedIn, isStudent, asyncWrap(updateInfo));
router.post("/verify-payment",isLoggedIn,  asyncWrap(verifyPayment))
router.post("/create-order",isLoggedIn, isStudent, asyncWrap(createOrder));

function asyncWrap(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default router;