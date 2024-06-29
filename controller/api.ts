import userCollections from "../repository/userCollection";
import { NextFunction, Request, Response } from "express";
import ApiError from "../entities/ApiError";

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await userCollections.doc(id).update(payload);
    res.json({ status: "success", message: "data update successfully" });
  } catch (error: any) {
    if (error?.code === 5) {
      return next(new ApiError("Document not found", 404, error));
    }
    console.log(error);
    next(error);
  }
};

const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { data } = await userCollections.doc(id).get();
    res.json({ status: "success", message: "data fetched successfully", data });
    return data;
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { updateUser, getUserData };
