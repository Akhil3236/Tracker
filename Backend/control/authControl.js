import { User } from "../models/user/usermodel.js";
import bycrpt from "bcrypt"
import jwt from "jsonwebtoken"

/*--------------------------
        helpers
        1)generate jwt access-token
----------------------------*/
const generateaccesstoken=(user)=>{

    return jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_TOKEN,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
}
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

        const token=generateaccesstoken(user);

        res.cookie("token", token, {
            httpOnly: true,    // prevent JS access
            secure: true,      // only send on HTTPS
            sameSite: "strict", // protect CSRF
            maxAge: 60 * 60 * 1000, // 1 hour
          });
        
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



/*--------------------------
       user Logout 
----------------------------*/
export const logout=async(req,res)=>{
    res.clearCookie("token");
    res.json({ message: "Logged out" });
}