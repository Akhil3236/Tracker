/*--------------------------
        1) getting the products
----------------------------*/
export const productList=async(req,res)=>{
    
    res.status(200).json({
        message:"all products"
    })
}
/*--------------------------
        2) admin can add the prodducts to the product list
----------------------------*/
export const edit=async(req,res)=>{

    res.status(200).json({
        message:"edited products"
    })
}

/*--------------------------
        3) admin can edit the products to the page ofr thje prducts
----------------------------*/


export const add=async(req,res)=>{
    
    res.status(200).json({
        message:"added products"
    })
}


/*--------------------------
4) admin can deleted the selected product
----------------------------*/
export const deleteproduct=async(req,res)=>{
    
    res.status(200).json({
        message:"deleted products"
    })
}
