import express from "express";
import { add, deleteproduct, edit, productList } from "../control/productscontrol.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const productRouth=express.Router();

productRouth.get("/",authMiddleware,productList);
productRouth.get("/add",authMiddleware,add);
productRouth.get("/edit",authMiddleware,edit);
productRouth.get("/delete",authMiddleware,deleteproduct);