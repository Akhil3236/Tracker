import express from "express";
import { orders } from "../control/orderControl.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const orderRouth=express.Router();

orderRouth.get("/",authMiddleware,orders);
