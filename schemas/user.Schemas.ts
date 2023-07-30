import mongoose from "mongoose";
import { UserModel } from "../models/UserModel";

const userSchemas = new mongoose.Schema<UserModel>({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    country:{
        type:String
    },
    zipcode:{
        type:Number
    },
    district:{
        type:String
    }
})

const UserCollection = mongoose.model<UserModel>('User',userSchemas);
export default UserCollection;
