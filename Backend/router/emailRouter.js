import express from "express";
import { otp, reset, send_mail, welcome } from "../control/authmail.js";

export const emailRouter=express.Router();

emailRouter.post("/welcome",welcome);
emailRouter.post("/password",send_mail);
emailRouter.post("/reset",reset);
emailRouter.post("/otp",otp);
