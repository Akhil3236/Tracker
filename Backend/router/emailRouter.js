import express from "express";
import { send_mail } from "../control/authmail.js";

export const emailRouter=express.Router();

emailRouter.post("/password",send_mail);