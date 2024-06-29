import express, { NextFunction, Request, Response } from "express";
import { userRoutes } from "../routes";
import ApiError from "../entities/ApiError";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to backend-repo api");
});

app.use("/user", userRoutes);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    const { error, message, statusCode, status } = err;
    res.status(statusCode).json({ status, message, error });
  }
  res.status(500).json({ message: "Something went wrong", err });
});

export default app;
