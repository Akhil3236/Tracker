import { User } from "../models/user/usermodel.js";
import bycrpt from "bcrypt"
import jwt, { decode } from "jsonwebtoken"
import admin from "../src/firebase.js";



/*--------------------------
        helpers
        1)generate jwt access-token
----------------------------*/
const generateaccesstoken=(user)=>{

    return jwt.sign(
        {id:user._id,email:user.email,role:user.role,name:user.name},
        process.env.JWT_TOKEN,
        {expiresIn: process.env.JWT_EXPIRES_IN}
    );
}

// added 
/*--------------------------
         user sign-in 
----------------------------*/          
export const signin=async(req,res)=>{
    
    try {
        
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"Missing Datails"}); 
        }
        const user=await User.findOne({email});
        
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        
        const isMatch =await bycrpt.compare(password,user.password);
        
        
        
        if(isMatch){
            
            const token=generateaccesstoken(user);
        
            res.cookie("token", token, {
                httpOnly: true,    // prevent JS access
                secure: false,      // only send on HTTPS
                sameSite: "lax", // protect CSRF
                maxAge: 60 * 60 * 1000, // 1 hour
            });
            
            res.status(200).json({
                message:"sucessfull"
            })
        }
        else if(!isMatch){
            res.status(401).json({
                message:"incorrect password"
            })
        } 
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
}

/*-----------------------------------
         user sign-in with the google
-------------------------------------*/


export const google=async(req,res)=>{

    const token1=req.body;
    if (!token1) return res.status(401).json({ error: "No token provided" });

    
    const tokenid=token1.token;

    try {
        
        const decoded = await admin.auth().verifyIdToken(tokenid);
        const userRecord = await admin.auth().getUser(decoded.uid);
        const email=userRecord.email;

        const user=await User.findOne({email:`${email}`});

        if(!user){
            return res.status(404).json({
                message:"user not found!  please login"
            })
        }

        const token=generateaccesstoken(user);
        
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 60 * 60 * 1000,
            });
            
            res.status(200).json({
                message:"sucessfull"
            })

        
        
    } catch (error) {
        return res.status(401).json({ message: "Invalid Google token" });
    }

}

/*--------------------------
        user sign-up 
----------------------------*/

export const signup=async(req,res)=>{ 

    try {

        const {name,email,password}=req.body;
        
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:'Missing Datails'});
        }

        const hasedpassword= await bycrpt.hash(password,10);

        const check=await User.findOne({email});
        if(check){
            res.status(409).json({
                message:"already exits!"
            })
        }
        else{
            const user=new User({
                name,email,password:hasedpassword
            })
            await user.save();
            res.status(201).json({"message":"added!"})
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

