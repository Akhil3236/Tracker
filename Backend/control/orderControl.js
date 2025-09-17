import { Order } from "../models/order/order.js";

/*---------------------------------
    1) to get the order deails  
---------------------------------*/
export const orders=async(req,res)=>{
    
    const userId=req.user.id;
    const order=await Order.find({userId:userId});
    
    if(orders){
        res.status(200).json(order);
    }
    else{
        res.status(404).json({
            message:"not found ! "
        })
    }
}

/*---------------------------------
      2) to cancel the order 
---------------------------------*/

export const cancel=async(req,res)=>{

    const id=req.params;

    res.status(200).json({
        message:"order has been cancalled"
    })

}
