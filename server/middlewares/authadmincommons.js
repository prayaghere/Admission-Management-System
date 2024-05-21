import User from "../model/userModel.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;

export const protectAdmins = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (req.user.role !== "admin" && req.user.role !== "headAdmin") {
        return res.status(401).send("Not authorized, not an admin");
      }

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};
