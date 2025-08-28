import express from "express";
import { add, deleteproduct, edit, productList } from "../control/productscontrol.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const productRouth=express.Router();

productRouth.get("/",authMiddleware,productList);
productRouth.post("/add",authMiddleware,add);
productRouth.put("/edit/:id",authMiddleware,edit);
productRouth.post("/delete/:id",authMiddleware,deleteproduct);