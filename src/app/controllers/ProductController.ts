import { Request, Response } from "express";
import ProductsRepository from "../repositories/ProductsRepository";
import Product from "../models/Product";

type ICreateProduct = Omit<Product, 'id'>

class ProductController {
    async index(req: Request, res: Response) {
        const products = await ProductsRepository.findAll();
        res.status(200).json(products);
    }
    
    async store(req: Request, res: Response) {
        const {
            name,
            url_photo,
            price,
            stock_quantity
        } = req.body;

        const product = await ProductsRepository.create({
            name,
            price,
            url_photo,
            stock_quantity
        });

        return res.status(201).json(product);
    }
}

export default new ProductController();