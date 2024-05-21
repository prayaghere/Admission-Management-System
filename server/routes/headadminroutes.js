import { Router } from "express";
import {
  adminLists,
  createAdmin,
  accessDashboard,
  createFormSetter,
} from "../controllers/headadmincontrollers.js";
import {
  formSettersList,
  deleteFormSetterById,
} from "../controllers/formSetterControllers.js";
import { deleteAdminById } from "../controllers/admincontrollers.js";
// const { accessDashboard, adminLists, createAdmin } = default; // const { protectAdmin } = _default;
import { protectHeadAdmin } from "../middlewares/authheadadminmiddleware.js";
import { protectAdmins } from "../middlewares/authadmincommons.js";

const router = Router();
router.route("/").get(protectHeadAdmin, adminLists);
router.route("/Dashboard").get(protectHeadAdmin, accessDashboard);
router.route("/admin").post(protectHeadAdmin, createAdmin);
router.route("/admin/:id").delete(protectAdmins, deleteAdminById);
router.route("/formsetter").post(protectAdmins, createFormSetter);
router.route("/formsetter").get(protectAdmins, formSettersList);
router.route("/formsetter/:id").delete(protectAdmins, deleteFormSetterById);

export default router;
