import User from "../model/userModel.js";
import { sendEmail } from "../helpers/emailService.js";
export const accessDashboard = async (req, res) => {};

export const adminLists = async (req, res) => {
  try {
    const admins = await User.find({ role: "headAdmin" }).select("-password");
    res.status(200).send(admins);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const createAdmin = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    // Check if all required fields are provided
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).send("Please enter all the fields");
    }

    // Check if a user with the provided email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    // Create a new admin user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      role: "admin",
      createdBy: req.user._id.toString(), // Assuming req.user contains the user's ID
    });
    const to = email;
    const subject = "Admin Access Granted";
    const role = "admin";

    await sendEmail(to, subject, role, email, password);

    // Send a success response
    res.status(201).send("Admin created successfully");
  } catch (error) {
    // Handle any errors
    console.error("Error creating admin:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const createFormSetter = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    if (!firstname || !lastname || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      role: "formSetter",
      createdBy: req.user._id.toString(),
    });
    const to = email;
    const subject = "Form Setter Access Granted";
    const role = "formSetter";

    await sendEmail(to, subject, role, email, password);
    res.status(200).send("formSetter Created");
  } catch (error) {
    res.status(400).send(error);
  }
};
