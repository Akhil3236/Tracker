import mongoose from "mongoose";

const product=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
   cost:{
        type:double,
        required:true

    },
    discount:{
        type:double,
        required:true
    },
    des:{
         
        type:string,
        required:true
    }
})