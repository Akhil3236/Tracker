import { Products } from "../models/products/product.js"

/*--------------------------
        1) getting the products
----------------------------*/
export const productList=async(req,res)=>{
    try {
        const [products]=await Products.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json(error);
    }
}
/*---------------------------------------------------------
2) admin can add the prodducts to the product list
-----------------------------------------------------------*/
export const edit=async(req,res)=>{

    try {
        const updatedProduct = await Products.findByIdAndUpdate(
          req.params.id,          // product ID from URL
          req.body,               // new data from request body
          { new: true }           // return the updated product
        );
        
        if(!updatedProduct){
            res.status(404).json({
                message:"product not found !!!"
            })
        }
        res.json(updatedProduct);
      } catch (err) {
        res.status(500).json({ error: "Failed to update product" });
      }
}

/*------------------------------------------------------------------
3) admin can edit the products to the page ofr thje products
-------------------------------------------------------------------*/
export const add=async(req,res)=>{

    const {name,cost,discount,desc,image,images,fav}=req.body;

    if(!name || !cost || !discount || !desc){
        return res.status(400).json({
            message:"missing details"
        })
    }
    const product=new Products({
        name,cost,discount,desc,image,images,fav
    })

    await product.save();
    res.status(200).json({
        message:"product is added"
    })
}

/*--------------------------
4) admin can deleted the selected product
----------------------------*/
export const deleteproduct=async(req,res)=>{
    
    try {
       
      const deleteproduct=await Products.findByIdAndDelete(req.params.id);
      if(!deleteproduct){
        res.status(300).json({
            message:"product not found!"
        })
      }
      else{
        res.status(200).json({
          message:"product deleted sucessfull !!!!!"
        })
      }
    } catch (error) {
       res.status(404).json({message:"product is not deleted !!!"})   
    }
}
