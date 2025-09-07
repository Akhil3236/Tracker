import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    Qauntity:{
         type:Number,
         required:true
    },
    image: {
        type: String,
        required: false
    },
    images: {
        type: [String], // Array of image URLs
        required: false
    },
    cat:{
        type:String,
        required:false
    }
});

export const Products = mongoose.model('Products', productSchema);