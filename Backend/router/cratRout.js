import express from "express"
import { addcart, cart, remove_prduct } from "../control/cartControl.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


export const cartRouter=express.Router();


cartRouter.post('/add',authMiddleware,addcart);
cartRouter.post('/remove',authMiddleware,remove_prduct);
cartRouter.get('/',authMiddleware,cart);