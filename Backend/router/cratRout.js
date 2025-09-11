import express from "express"
import { addcart, cart, order, remove_prduct } from "../control/cartControl.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { rediscart } from "../redis/server.js";


export const cartRouter=express.Router();


cartRouter.post('/add',authMiddleware,addcart);
cartRouter.post('/remove',authMiddleware,remove_prduct);
cartRouter.get('/:id',authMiddleware,cart);
cartRouter.get("/redis/cart",authMiddleware,rediscart)
cartRouter.post("/place-order",authMiddleware,order)