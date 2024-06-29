import { NextFunction, Request, Response } from "express";
import ApiError from "../entities/ApiError";
import { adminApp } from "../config/firebaseConfig";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new ApiError("Token not found", 401));
  }
  try {
    await adminApp.auth().verifyIdToken(token);
    next();
  } catch (error) {
    return next(new ApiError("Invalid token", 401));
  }
}
