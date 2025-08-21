
/*--------------------------
       user details 
----------------------------*/


export const userdeatils=async(req,res)=>{
    const userd=req.user;
    res.status(200).json(
     userd
    )
 }