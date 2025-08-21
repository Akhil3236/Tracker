import express from "express"
import { signin, signup } from "../control/authControl.js";

export const authRouter=express.Router();

authRouter.post('/signin',signin);
authRouter.post('/signup',signup);

