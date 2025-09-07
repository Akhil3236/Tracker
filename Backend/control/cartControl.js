

/*---------------------------------
1) add the product in the cart
---------------------------------*/
export const addcart=async(req,res)=>{

    res.status(200).json({
        message:"added successfully!!!!"
    })
}



/*-------------------------------------
2)  TO get the products in the cart 
------------------------------------*/

export const cart=async(req,res)=>{

    res.status(200).json({
        message:"all the cart products"
    })
}



/*---------------------------------
3) remove the product in the cart
---------------------------------*/
export const remove_prduct=async(req,res)=>{

    res.status(200).json({
        message:"product removed sucessfully"
    })

}