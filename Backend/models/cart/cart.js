import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
        quantity: { type: Number, default: 1 }
      }
    ]
  });

export const Cart=mongoose.model('Cart',cartSchema);
  