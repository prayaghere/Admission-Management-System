import PostedForm from "../model/postedForm.js";

// Create a new posted form
export const postForm = async (req, res) => {
  try {
    const { formData } = req.body;

    // Check if a posted form already exists
    let postedForm = await PostedForm.findOne({});

    if (!postedForm) {
      // Create a new posted form entry
      postedForm = new PostedForm({ formData });
      await postedForm.save();
    } else {
      // Update the existing posted form entry
      postedForm.formData = formData;
      postedForm.updatedAt = Date.now();
      await postedForm.save();
    }

    res.status(200).json({ postedForm });
  } catch (error) {
    console.error("Error posting or updating form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get the posted form
export const getPostedForm = async (req, res) => {
  try {
    const postedForm = await PostedForm.findOne({});
    res.json({ postedForm });
  } catch (error) {
    console.error("Error getting posted form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePostedForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { formData } = req.body;

    // Find the existing posted form by ID
    const postedForm = await PostedForm.findById(id);

    if (postedForm) {
      // Update the posted form data
      postedForm.formData = formData;
      postedForm.updatedAt = Date.now();
      await postedForm.save();
      res.json({ postedForm });
    } else {
      res.status(404).json({ error: "Posted form not found" });
    }
  } catch (error) {
    console.error("Error updating posted form:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
