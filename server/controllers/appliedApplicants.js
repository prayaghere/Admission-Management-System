// controllers/applicantController.js
import Applicant from "../model/applicants.js";
import User from "../model/userModel.js";

export const createApplicant = async (req, res) => {
  try {
    console.log(req.body);
    const applicant = new Applicant(req.body);
    await applicant.save();
    res.status(201).json(applicant);
  } catch (error) {
    res.status(500).json({ message: "Error creating applicant" });
  }
};

export const getAllApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applicants" });
  }
};

export const getSingleApplicant = async (req, res) => {
  try {
    // const applicant = await Applicant.findById(req.params.id);
    const id = req.params.id;
    const applicant = await Applicant.find({"fields.value":id});
    
    if (!applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }
    
    res.json(applicant);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getSubmissionsByFormId = async (req, res) => {
  try {
    // Assuming formId is passed as a parameter in the request URL
    const formId = req.params.formId;

    // Find submissions by formId
    const submissions = await Applicant.find({ formId: formId });

    // Send the submissions as a response
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ message: "Error fetching submissions" });
  }
};
