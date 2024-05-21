import { Router } from "express";
import {
  createApplicant,
  getAllApplicants,
  getSingleApplicant,
  getSubmissionsByFormId,
} from "../controllers/appliedApplicants.js";
const router = Router();
router.post("/submit", createApplicant);
router.get("/all", getAllApplicants);
router.get("/:id", getSingleApplicant);
router.get("/submissions/:formId", getSubmissionsByFormId);

export default router;
