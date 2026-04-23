import express from "express";
const router = express.Router();
import { isOwner, isLoggedIn, checkUser } from "../middleware.js";
import { addNotice, addRoom, deleteComplaint, deleteNotice, getStudents, myInfo, overview, room, updateOwner, notice, ownerPayment, assignRoom, recentComplaints,paymetStatus} from "../controllers/Owner.js";


router.get("/dashboard/overview",isLoggedIn, asyncWrap(overview));
router.get("/recent-complaints",isLoggedIn, asyncWrap(recentComplaints));
router.get("/getStudents",isLoggedIn,isOwner, asyncWrap(getStudents));
router.get("/rooms",isLoggedIn,isOwner, asyncWrap(room));
router.post("/addRoom",isLoggedIn,isOwner, asyncWrap(addRoom));
router.post("/assignRoom",isLoggedIn,isOwner, asyncWrap(assignRoom));
router.get("/myInfo", isOwner,checkUser, asyncWrap(myInfo));
router.put("/updateOwner", isOwner, asyncWrap(updateOwner));
router.get("/notice",checkUser, asyncWrap(notice));
router.post("/notice/add",checkUser, asyncWrap(addNotice));
router.get("/owner/payment",isLoggedIn, isOwner, asyncWrap(ownerPayment));
router.get("/paymentStatus",isLoggedIn, isOwner, asyncWrap(paymetStatus));
router.delete("/notice/:id", asyncWrap(deleteNotice));
router.patch("/complaint/:id",checkUser, asyncWrap(deleteComplaint));


function asyncWrap(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default router;
