import express from "express"
import { google, googleup, signin, signup } from "../control/authControl.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { logout } from "../control/authControl.js";

export const authRouter=express.Router();

authRouter.post('/signin',signin);
authRouter.post('/signup',signup);
authRouter.post('/google',google);
authRouter.post('/googleup',googleup);
authRouter.post('/logout',authMiddleware,logout);



