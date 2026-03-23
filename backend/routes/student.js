import express from "express";
const router = express.Router();
import { isLoggedIn, isStudent } from "../middleware.js";
import { addComplaint, myComplaint , Info, updateInfo, StudentOverview} from "../controllers/Student.js";
import { complaint } from "../controllers/Owner.js";

router.get("/Student/overview",isLoggedIn, asyncWrap(StudentOverview));
router.get("/complaint",isLoggedIn, asyncWrap(complaint));
router.post("/complaint/add",isLoggedIn, isStudent, asyncWrap(addComplaint));
router.get("/my-complaint", isStudent, asyncWrap(myComplaint));
router.get("/student/info", isStudent, asyncWrap(Info));
router.put("/student/updateInfo", isStudent, asyncWrap(updateInfo));


function asyncWrap(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default router;