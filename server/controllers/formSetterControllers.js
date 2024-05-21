import User from "../model/userModel.js";

export const accessDashboard = async (req, res) => {};

export const formSettersList = async (req, res) => {
  try {
    const formsetters = await User.find({ role: "formSetter" }).select(
      "-password"
    );
    res.status(200).send(formsetters);
  } catch (err) {
    res.status(400).send(err);
  }
};
export const deleteFormSetterById = async (req, res) => {
  const { id } = req.params;
  try {
    const formSetter = await User.findOneAndDelete({
      _id: id,
      role: "formSetter",
    });

    if (!formSetter) {
      return res.status(404).send("Form Setter not found");
    }

    res.status(200).send("Form Setter deleted successfully");
  } catch (error) {
    console.error("Error deleting form setter:", error);
    res.status(500).send("Internal Server Error");
  }
};
