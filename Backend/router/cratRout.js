import express from "express"
import { addcart, cart, remove_prduct } from "../control/cartControl.js";


export const cartRouter=express.Router();


cartRouter.post('/add',addcart);
cartRouter.post('/remove',remove_prduct);
cartRouter.post('/',cart);