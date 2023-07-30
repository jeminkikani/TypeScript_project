import { Request ,Response } from "express";
import Productcollection from "../schemas/product.Schemas";
import { ProductModel } from "../models/productModel";
import * as utils from "../middlware/utils";
import mongoose from 'mongoose';


// createProduct
export const createProduct = async (req:Request,res:Response)=>{
    try {
        const {product_name ,product_detail ,product_SQ ,price ,product_additional_features } = req.body;
        const isExistUser : any = await utils.getUser(req,res);


        if(isExistUser){
                const theProuct: ProductModel | undefined | null = await Productcollection.findOne({ product_SQ: product_SQ });
                if(theProuct)
                {
                    return res.json({msg:'product is already exist..'});
                }
        }

        const newProduct = await Productcollection.create({
            product_name,
            product_detail,
            product_SQ,
            price,
            product_additional_features
        })
        const create = await new Productcollection(newProduct).save();
            res.status(201).json({msg:'new product created' });
        
        
    } catch (error) {
        console.log(error);
        res.json({msg:'server error'});
    }
}


// getAllProduct
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const theUser: any = await utils.getUser(req, res);
        if (theUser) {
            const allProducts: ProductModel[] = await Productcollection.find().populate({ path: "userObj", strictPopulate: false }).populate({ path: "categoryObj", strictPopulate: false }).populate({ path: "subcategoryObj", strictPopulate: false });
            return res.status(200).json({
                data: allProducts,
                message: 'Products Retrieved Successfully...'
            })
        }
    } catch (error) {
       console.log(error);
       res.status(404).json('server error');
    }
};


// get Specific Product
export const getProduct = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.params;
        const mongoProductId = new mongoose.Types.ObjectId(product_id);
        const theUser: any = await utils.getUser(req, res);
        if (theUser) {
            const theProduct: ProductModel | undefined | null = await Productcollection.findById(mongoProductId).populate({ path: "userObj", strictPopulate: false }).populate({ path: "categoryObj", strictPopulate: false }).populate({ path: "subCategoryObj", strictPopulate: false });
            if (!theProduct) {
                res.status(404).json('product not find')
            }
            return res.status(200).json({
                data: theProduct,
                message: 'Product Retrieved Successfully...'
            })
        }
    } catch (error) {
       console.log(error);
       res.status(404).json('server error');
    }
};



// update product
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const {product_name ,product_detail ,product_SQ ,price ,product_additional_features , categoryId , subCategoryId} = req.body;
        const { product_id } = req.params;
        const mongoProductId = new mongoose.Types.ObjectId(product_id);
        const theUser: any = await utils.getUser(req, res);
        if (theUser) {
            const theProduct: ProductModel | undefined | null = await Productcollection.findById(mongoProductId);
            if (!theProduct) {
                res.status(404).json('product not find')
            }
            const newProduct: ProductModel = {
                product_name: product_name,
                product_detail: product_detail,
                product_SQ: product_SQ,
                price: price,
                product_additional_features: product_additional_features,
                categoryObj: categoryId,
                subcategoryObj: subCategoryId,
                userObj: theUser._id
            };

            const updateProduct = await Productcollection.findByIdAndUpdate(mongoProductId, { $set: newProduct }, { new: true });
            if (updateProduct) {
                return res.status(200).json({
                    data: updateProduct,
                    message: 'Product Updated Successfully...'
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(404).json('server error');
    }
};

 
// delete product
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { product_id } = req.params;
        const mongoProductId = new mongoose.Types.ObjectId(product_id);
        const theUser: any = await utils.getUser(req, res);

        if (theUser) {
            const theProduct: ProductModel | undefined | null = await Productcollection.findById(mongoProductId).populate({
                path: "userObj",
                strictPopulate: false
            }).populate({
                path: "categoryObj",
                strictPopulate: false
            }).populate({
                path: "subCategoryObj",
                strictPopulate: false
            });
            if (!theProduct) {
                res.status(404).json('product not find')
            }

            const deleteProduct = await Productcollection.findByIdAndDelete(mongoProductId);
            if (deleteProduct) {
                return res.status(200).json({
                    data: deleteProduct,
                    message: 'Product Deleted Successfully...'
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(404).json('server error');    }
};