import { Router } from "express";
// import { accessDashboard } from "../controllers/applycontrollers.js";
import {protectStudent} from "../middlewares/authmiddleware.js"; // const { protectStudent } = default;
import { applicantLists } from "../controllers/applycontrollers.js";
import { protectUser } from './../middlewares/authuser.js';
const router = Router();

router.route("/list").get(protectUser,applicantLists)
// router.route("/Dashboard").get(protectStudent, accessDashboard);
export default router;
