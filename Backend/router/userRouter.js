import express from "express";
import { userdeatils } from "../control/userControl.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


export const userRouter=express.Router();

userRouter.get('/',authMiddleware,userdeatils);
