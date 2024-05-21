import { Router } from "express";
import {
  postForm,
  getPostedForm,
  updatePostedForm,
} from "../controllers/postedFormController.js";
const router = Router();
// Create a new posted form
router.post("/postForm", postForm);

// Get the posted form
router.get("/getPostedForm", getPostedForm);


router.patch("/updatePostedForm/:id", updatePostedForm);

export default router;
