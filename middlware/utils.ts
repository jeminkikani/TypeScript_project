import { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import UserCollection from "../schemas/user.Schemas";


export const getUser =async (req:Request , res:Response) => {
     try {
        let theUSer: any = req.header['authorization'];
        theUSer = await jwt.verify(theUSer , process.env.SECRET_KEY as string)
        const UserId = theUSer.id;
        if(!UserId){
            return res.status(401).json({
                message: 'Invalid User Request'
            })
        }
    const mongoId = new mongoose.Types.ObjectId(UserId);
    let userObj : any = await UserCollection.findById(mongoId);
    if(!userObj){
        return res.status(404).json('User is not found....');
    }
     } catch (error) {
        console.log(error)
        res.status(404).json({msg:"server error..."})
     }  
} 

