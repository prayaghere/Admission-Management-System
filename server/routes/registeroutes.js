import { Router } from "express";
const router = Router();

import { registerUser, loginUser } from "../controllers/registercontrollers.js";
// import  loginUser  from "../controllers/registercontrollers.js";
// const { RegisterUser, loginUser } = default;
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
export default router;
