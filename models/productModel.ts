import mongoose from "mongoose";

export interface ProductModel {
    _id?: String;
    product_name: String;
    product_detail: String;
    product_SQ: String;
    price: String;
    product_additional_features: String;
    userObj: mongoose.Schema.Types.ObjectId;
    categoryObj: mongoose.Schema.Types.ObjectId;
    subcategoryObj: mongoose.Schema.Types.ObjectId;
}