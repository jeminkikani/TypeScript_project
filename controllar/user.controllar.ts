import { Request, Response } from "express";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";
import userSchemas from "../schemas/user.Schemas";
import UserCollection from "../schemas/user.Schemas";
import * as utils from "../middlware/utils";

// const User = require('../models/user.model');
// const secrate = process.env.SECRET_KEY;

export const welcomeUser = async (req: Request, res: Response) => {
  try {
    res.send("WelCome To Furniture App");
  } catch (error) {
    console.log(error);
    res.json({ msg: "server error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirm_password,
      address,
      country,
      zipcode,
      district,
    } = req.body;

    if (password === confirm_password) {
      const users = await UserCollection.findOne({ email });
      if (users) {
        return res.json({ msg: "User is already exist...." });
      }

      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);

      let newUser: UserModel = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashpassword,
        address: address,
        country: country,
        zipcode: zipcode,
        district: district,
      };
      let user = await new UserCollection(newUser).save();
      res.status(201).json({ msg: "new user created" });
    } else {
      res.status(404).json({ msg: "user can not created..." });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "server error" });
  }
};

exports.loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isExistUser: any = await UserCollection.findOne({ email });
    if (!isExistUser) {
      res.status(404).json({ message: `User is not found` });
    }

    const ismatchpassword = await bcrypt.compare(
      password,
      isExistUser.password as string
    );

    console.log(ismatchpassword);
    if (!ismatchpassword) {
      res.json({ msg: "password is incorrect..." });
    }
    // let payload = {
    //     id: isExistUser._id,
    //     email: isExistUser.email
    // };
    let secretKey: string | undefined = process.env.SECRET_KEY;

    const isvalidToken = jwt.sign(
      { userId: isExistUser._id },
      secretKey as string,
      { expiresIn: "30d" }
    );
    res.json({ msg: "User is login...", token: isvalidToken });
  } catch (error) {
    console.log(error);
    res.json({ msg: "server error" });
  }
};

exports.getAllUser = async (req: Request, res: Response) => {
  try {
    const getUser = await utils.getUser(req, res);
    if (getUser) {
      res.status(200).json({ getUser });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const getUser = await utils.getUser(req, res);
    if (!getUser) {
      return res.json({ msg: "user is not found...." });
    }
    const theUSer: any = await utils.getUser(req, res);
    const updateuser: any = await utils.getUser(req, res);
    const user = await updateuser.save();
    if (user) {
      res.json(updateuser);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "server error" });
  }
};

exports.updatePassword = async (req: Request, res: Response) => {
  try {
    const { password, confirm_password } = req.body;
    if (password === confirm_password) {
      const getUser = await utils.getUser(req, res);
      if (!getUser) {
        res.json({ msg: "user is not Found" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt);
      const theUSer: any = await utils.getUser(req, res);
      if (theUSer) {
        theUSer.password = hashpassword;
        const userObj = await theUSer.save();
        if (userObj) {
          return res
            .status(200)
            .json({ msg: "Password changed successfully!" });
        } else {
          return res
            .status(400)
            .json({ msg: "password and confirm password is not match.." });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "server error" });
  }
};

// exports.deleteUser = async (req,res)=>{
//     try {
//         const user = user.findById({user:user._id})

//     } catch (error) {
//         console.log(error);
//         res.json({msg: 'server error'})
//     }
// }
