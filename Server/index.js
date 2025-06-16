import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./utils/db.js";
import userRoute from "./routes/userRoute.js";
import todoRoute from "./routes/todoRoute.js";
import isAuthenticted from "./middlewares/authMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT_NO || 8000;

//middelwares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/api/testApi", (req, res) => {
  res.send({
    message: "Test Successfull",
    success: true,
  });
});
app.use("/api/user", userRoute);
app.use("/api/todo", isAuthenticted, todoRoute);

app.listen(PORT, () => {
  console.log(`Listeing to Port No ${PORT}`);
  connectDB();
});
