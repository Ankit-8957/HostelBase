import express from "express";
const router = express.Router();
import { contact, logout, Ownerlogin, OwnerSignup, StudentLogin, StudentSignup } from "../controllers/Auth.js";


router.post("/owner/signup", OwnerSignup);
router.post("/owner/login", Ownerlogin);

router.post("/student/signup", StudentSignup);
router.post("/student/login", StudentLogin);

router.post("/logout", logout);
router.post("/contact", contact);

export default router;