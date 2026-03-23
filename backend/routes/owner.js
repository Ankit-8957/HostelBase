import express from "express";
const router = express.Router();
import { isOwner, isLoggedIn, checkUser } from "../middleware.js";
import { addNotice, addRoom, deleteComplaint, deleteNotice, getStudents, myInfo, overview, room, updateOwner, notice } from "../controllers/Owner.js";


router.get("/dashboard/overview",isLoggedIn, asyncWrap(overview));
router.get("/getStudents",isLoggedIn,isOwner, asyncWrap(getStudents));
router.get("/rooms",isLoggedIn,isOwner, asyncWrap(room));
router.post("/addRoom",isLoggedIn,isOwner, asyncWrap(addRoom));
router.get("/myInfo", isOwner,checkUser, asyncWrap(myInfo));
router.put("/updateOwner", isOwner, asyncWrap(updateOwner));
router.get("/notice",checkUser, asyncWrap(notice));
router.post("/notice/add",checkUser, asyncWrap(addNotice));
router.delete("/notice/:id", asyncWrap(deleteNotice));
router.patch("/complaint/:id",checkUser, asyncWrap(deleteComplaint));


function asyncWrap(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default router;
