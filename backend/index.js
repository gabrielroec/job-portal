import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";

dotenv.config();
const app = express();

//middlware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "https://localhost:5173",
  Credentials: true,
};
app.use(cors(corsOptions));

//apis
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);

app.listen(8000, () => {
  connectDB();
  console.log("Server running in port 8000");
});
