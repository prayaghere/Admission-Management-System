import { Router } from "express";
import { protectFormSetter } from "../middlewares/authformsettermiddleware.js";

const router = Router();

// router.route("/list").get(protectFormSetter);
export default Router;
