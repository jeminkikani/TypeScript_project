import mongoose from "mongoose";

export interface ICartProduct {
    _id: string;
    title: string;
    des: string;
    imageUrl: string;
    brand: string;
    price: string;
    quantity: string;
    count: number;
    sold: number;
    categoryObj?: CategoryObj;
    subCategoryObj?: SubCategoryObj;
    createdAt?: string; 
    updatedAt?: string;
    __v?: number;
}

export interface CategoryObj {
    _id: string;
    name: string;
    desc: string;
    subCategories?: (string)[] | null;
    createdAt: string;
    updatedAt: string;
}

export interface SubCategoryObj {
    _id: string;
    name: string;
    desc: string;
    __v: number;
}

export interface INewCartProduct {
    product: string;
    count: number;
    price: number;
}

export interface ICart {
    _id?: string;
    products: INewCartProduct[];
    total: string;
    tax: string;
    grandTotal: string;
    userObj: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}