import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const password = process.env.MAIL_PASS;
const email = process.env.MAIL_ID;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

// Function to send an email
export const sendEmail = async (to, subject, role, email, password) => {
  try {
    // Define the email options
    const mailOptions = {
      from: "deepakyadav101002@gmail.com", // Sender email address
      to,
      subject, // Subject line
      text: `Hi,You have been granted ${role} access to IIIT Bhubaneswar Admission Portal.
      \n\n \n\n website link :- https://iiit-bh-admission-portal.netlify.app/\n\nCredentials to log in are:\n\nEmail: ${email}\nPassword: ${password}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
