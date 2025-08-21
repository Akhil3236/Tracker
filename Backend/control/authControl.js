import { User } from "../models/user/usermodel.js";
import bycrpt from "bcrypt"


/*--------------------------
         user sign-in 
----------------------------*/

export const signin=async(req,res)=>{
    
    const {email,password}=req.body;
    if(!email || !password){
        return res.json({success:false,message:'Missing Datails'}); 
    }
     
    const user=await User.findOne({email});


    if(!user){
        return res.json({success:false,message:'user not found'})
    }

    const isMatch =await bycrpt.compare(password,user.password);

    if(isMatch){
        res.status(200).json({
            message:"sucessfull"
        })
    }
    else{
        res.status(404).json({
            message:"incorrect password"
        })
    }
    
}

/*--------------------------
        user sign-up 
----------------------------*/
export const signup=async(req,res)=>{ 

    try {

        const {name,email,password}=req.body;

        if(!name || !email || !password){
            return res.json({success:false,message:'Missing Datails'});
        }

        const hasedpassword= await bycrpt.hash(password,10);

        const check=await User.findOne({email});
        if(check){
            res.status(200).json({
                message:"already exits!"
            })
        }
        else{
            const user=new User({
                name,email,password:hasedpassword
            })
            await user.save();
            res.status(200).json({"message":"added!"})
        }
      } catch (error) {

        res.status(400).json({message:"user not added"},error);
        
    }
        
}
    
