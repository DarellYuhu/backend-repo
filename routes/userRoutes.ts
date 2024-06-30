import express from "express";
import { getUserData, updateUser } from "../controller/api";
import authMiddleware from "../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.use(authMiddleware);
userRoutes.patch("/update-user-data/:id", updateUser);
userRoutes.get("/fetch-user-data/:id", getUserData);

export default userRoutes;
