import User from "../model/userModel.js";
import generateToken from "../config/token.js";

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).send("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      role: "applicant",
    });

    return res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).send("Server Error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        _id: user._id,
        firstname: user.firstname,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).send("Invalid Email or Password");
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).send("Server Error");
  }
};
