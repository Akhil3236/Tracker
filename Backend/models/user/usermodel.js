import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:false
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    },
    createdAt: { 
        type: Date, 
        default: Date.now

     }
})
export const User=mongoose.model('User',userSchema);
