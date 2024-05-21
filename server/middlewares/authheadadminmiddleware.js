import User from "../model/userModel.js";
import pkg from 'jsonwebtoken';
const { verify } = pkg;
export const protectHeadAdmin = async (req, res, next) => {
  let token;
  {
    //console.log(req.user)
    //console.log(req.headers.authorization)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (req.user.role != "headAdmin") {
          return res.status(401).send("Not authorised,not a Head Admin");
        }
        next();
      } catch (err) {
        res.status(401);
        throw new Error("Not authorised,no token");
      }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

