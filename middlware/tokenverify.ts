import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

export const tokenVerifier = async (req : Request, res : Response, next : NextFunction)=>{
        try {
            // read token from request
            let secretKey :string | undefined = process.env.SECRET_KEY;

            if(secretKey){
                let token = req.headers['authorization'];
                if(!token){
                    return res.status(401).json({
                        message: 'No token provided!'
                    });
                }

                if(typeof token === 'string' && secretKey){
                    let decodeObj : any = jwt.verify(token, secretKey);
                    req.headers['user'] = decodeObj;
                    next();
            }else{
                return res.status(401).json({
                    message: 'Invalid token!'
                });
            }
        }
        } catch (error) {
            return res.status(500).json({
                message: 'Unauthorized, its invalid token'
            });
        }
};