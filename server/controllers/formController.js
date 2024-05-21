// controllers/formController.js
import Form from "../model/formModel.js";
// Create a new form
export const createForm = async (req, res) => {
  try {
    const { title, fields, endDate } = req.body;
    const newForm = new Form({ title, fields, endDate });
    await newForm.save();
    res
      .status(201)
      .json({ message: "Form created successfully", form: newForm });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating form", error: error.message });
  }
};

// Get a form by ID
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ form });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting form", error: error.message });
  }
};

// Delete a form by ID
export const deleteFormById = async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res
      .status(200)
      .json({ message: "Form deleted successfully", form: deletedForm });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting form", error: error.message });
  }
};

// Get all forms
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({ forms });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting forms", error: error.message });
  }
};
