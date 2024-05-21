import { Router } from "express";
import {
  createForm,
  getFormById,
  deleteFormById,
  getAllForms,
} from "../controllers/formController.js";
const router = Router();

// Create a new form
router.post("/createForm", createForm);

// Get a form by ID
router.get("/getForm/:id", getFormById);

// Delete a form by ID
router.delete("/deleteForm/:id", deleteFormById);

// Get all forms
router.get("/getAllForms", getAllForms);

export default router;
