import { Router, Request, Response } from "express";
import { tokenVerifier } from "../middlware/tokenverify";
import { validateForm } from "../middlware/validate";
import * as cartController from '../controllar/cart.conrollar';

const cartRouter : Router = Router();

cartRouter.post("/add", tokenVerifier, validateForm, async(req:Request, res:Response)=>{
    await cartController.createCart(req, res);
});

cartRouter.get("/me", tokenVerifier, async(req:Request, res:Response)=>{
    await cartController.getMyCart(req, res);
});

export default cartRouter;