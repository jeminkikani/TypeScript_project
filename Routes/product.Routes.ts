import { Request, Response, Router } from "express";
import * as productController from "../controllar/product.controllar";
import { tokenVerifier } from "../middlware/tokenverify";
import { validateForm } from "../middlware/validate";


const productRouter : Router = Router();


productRouter.post('/',tokenVerifier, validateForm, async (request:Request, response:Response) => {
    await productController.createProduct(request, response);
});



productRouter.get('/', tokenVerifier, validateForm, async(request:Request, response:|Response)=>{
    await productController.getAllProducts(request, response);
});


productRouter.get('/:id', tokenVerifier, validateForm, async(request:Request, response:Response)=>{
    await productController.getProduct(request, response);
});


productRouter.put('/:id', tokenVerifier, validateForm, async(request:Request, response:Response)=>{
    await productController.updateProduct(request, response);
});

productRouter.delete('/:id', tokenVerifier, validateForm, async(request:Request, response:Response)=>{
    await productController.deleteProduct(request, response);
});


export default productRouter;