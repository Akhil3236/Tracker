import express from "express";
import { orders } from "../control/orderControl.js";


export const orderRouth=express.Router();

orderRouth.post("/",orders);
