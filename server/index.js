import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
// import { notFound, errorHandler } from "./middlewares/errormiddleware";
import { resolve, join } from "path";
import bodyParser from "body-parser";
import cors from "cors";
import err from "./middlewares/errormiddleware.js";
import routes from "./routes/index.js";
dotenv.config();
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json()); // to accept json data
app.use(
  cors({
    origin: "*",
    credentials: true,
    //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
connectDB();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//login and dashboard for students
app.use("/api/v1", routes); //login and dashboard for admins
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(err.notFound);
app.use(err.errorHandler);
