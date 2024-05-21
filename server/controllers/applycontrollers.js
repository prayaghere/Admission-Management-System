import User from "../model/userModel.js";



export const applicantLists = async (req, res) => {
    try {
      const applicants = await User.find({ role: "applicant" }).select("-password");
      res.status(200).send(applicants);
    } catch (err) {
      res.status(400).send(err);
    }
  };
  