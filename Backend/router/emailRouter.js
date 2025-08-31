import express from "express";
import { otp, reset, send_mail } from "../control/authmail.js";

export const emailRouter=express.Router();

emailRouter.post("/password",send_mail);
emailRouter.post("/reset",reset);
emailRouter.post("/otp",otp);
