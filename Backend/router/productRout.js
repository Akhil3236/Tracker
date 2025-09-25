import express from "express";
import { add, deleteproduct, edit, productList } from "../control/productscontrol.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const productRouth=express.Router();

productRouth.get("/",productList);
productRouth.post("/add",add);
productRouth.put("/edit/:id",edit);
productRouth.post("/delete/:id",deleteproduct);