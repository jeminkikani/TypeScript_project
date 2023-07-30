import { Router, Request, Response } from "express";
import * as userController from  "../controllar/user.controllar"

const userRouter: Router = Router();

userRouter.get('/',async (request:Request, response:Response) => {
    await userController.welcomeUser(request,response);
});

userRouter.post('/new-user',async (request:Request, response:Response) => {
    await userController.createUser(request,response);
})


export default userRouter;