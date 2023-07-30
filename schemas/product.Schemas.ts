import mongoose from "mongoose";
import { ProductModel } from "../models/productModel";
const productSchemas = new mongoose.Schema<ProductModel>({
    product_name:{
        type:String,
        require:true
    },
    product_detail:{
        type:String
    },
    product_SQ:{
        type:String,
        require:true,
        unique:true
    },
    price:{
        type:Number,
        require:true
    },
    product_additional_features:{
        type:String
    }
});

const Productcollection = mongoose.model<ProductModel>('Product',productSchemas);
export default Productcollection;