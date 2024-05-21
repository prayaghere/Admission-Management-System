import { Router } from "express";
import {
  adminLists,
  accessDashboard,
} from "../controllers/admincontrollers.js"; // const { accessDashboard, adminLists, createAdmin } = default;
import { protectAdmin } from "../middlewares/authadminmiddleware.js"; // const { protectAdmin } = _default;
const router = Router();
router.route("/").get(adminLists);
router.route("/Dashboard").get(protectAdmin, accessDashboard);
// router.route("/form").post(protectAdmin, createFormSetter);
export default router;
