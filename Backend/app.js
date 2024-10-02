import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import { dbConnection } from "./database/dbConnections.js";
import { errorMiddleware } from "./middlewares/error.js"; 
 

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(cors({
  origin: process.env.FRONTEND_URL, // Specify your frontend's URL
  credentials: true,
}));

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );






  app.get("/", (res, req, next)=>{
    return res.status(200).json({
      success: true,
      message:"Hello World"
    })
  })






  
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
dbConnection();



app.use(errorMiddleware);
export default app;
