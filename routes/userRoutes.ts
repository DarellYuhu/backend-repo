import express from "express";
import { updateUser } from "../controller/api";
import authMiddleware from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.use(authMiddleware);
userRoutes.patch("/update-user-data/:id", updateUser);

export default userRoutes;
