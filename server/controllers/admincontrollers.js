import User from "../model/userModel.js";

export const accessDashboard = async (req, res) => {};

export const adminLists = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).send(admins);
  } catch (err) {
    res.status(400).send(err);
  }
};
export const deleteAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await User.findOneAndDelete({ _id: id, role: "admin" });

    if (!admin) {
      return res.status(404).send("Admin not found");
    }

    res.status(200).send("Admin deleted successfully");
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).send("Internal Server Error");
  }
};

// export const createFormSetter = async (req, res) => {
//   const { firstname, lastname, email, password } = req.body;

//   try {
//     if (!firstname || !lastname || !email || !password) {
//       res.status(400);
//       throw new Error("Please Enter all the Fields");
//     }

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       //console.log(firstname);
//       res.status(400);
//       throw new Error("User already exists");
//     }

//     const user = await User.create({
//       firstname,
//       lastname,
//       email,
//       password,
//       role: "formSetter",
//       createdBy: req.user._id.toString(),
//     });
//     //console.log(user);
//     return res.status(200).send("");
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// };
