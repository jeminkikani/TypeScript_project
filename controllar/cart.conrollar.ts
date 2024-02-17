import { Request, Response } from "express";
import * as utils from "../middlware/utils";
import { ICart } from "../models/cartModel";
import CartCollection from "../schemas/cart.Schemas";
import mongoose from "mongoose";

export const createCart = async (req: Request, res: Response) => {
    try {
        const theUser = await utils.getUser(req, res);
        if (theUser) {
            const { products, total, tax, grandTotal } = req.body;
            const cart = await CartCollection.findOne({ userObj: theUser._id });
            if (cart) {
                await CartCollection.findOne({ userObj: theUser._id })
            }
            const newCart: ICart = {
                products: products,
                total: total,
                tax: tax,
                grandTotal: grandTotal,
                userObj: theUser._id
            }
            const theCart = await new CartCollection(newCart).save();
            if (!theCart) {
                // return ThrowError(response, 400, 'Cart not created');
                res.status(404).json({msg: "cart not created.."})
            }
            const actualCart = await CartCollection.findById(new mongoose.Types.ObjectId(theCart._id)).populate({
                path: 'userObj',
                strictPopulate: false,
            });

            return res.status(200).json({
                data: actualCart,
                message: 'Cart created successfully'
            })
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: "server error" });
    }
};


export const getMyCart = async (req: Request, res: Response) => {
    try {
        const theUser = await utils.getUser(req, res);
        if (theUser) {
            const theCart: any = await CartCollection.find({userObj: new mongoose.Types.ObjectId(theUser._id)}).populate({
                path: 'products.product',
                strictPopulate: false
            }).populate({
                path: 'userObj',
                strictPopulate: false
            });
            return res.status(200).json({
                msg: "",
                data: theCart
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: "server error" });
    }
};