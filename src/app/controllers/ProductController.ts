import { Request, Response } from 'express';

import Product from '../models/Product';
import ProductService from '../services/ProductService';

type ICreateProduct = Omit<Product, 'id'>

class ProductController {
    async index(req: Request, res: Response) {
        const products = await ProductService.listProducts();
        return res.status(200).json(products);
    }
    
    async store(req: Request, res: Response) {
        const {
            name,
            url_photo,
            price,
            stock_quantity
        } = req.body;

        const product = await ProductService.createProduct({ name, price, url_photo, stock_quantity });

        return res.status(201).json(product);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const {
            name,
            url_photo,
            price,
            stock_quantity
        } = req.body;

        const updatedProduct = await ProductService.updateProduct({ id, name, url_photo, price, stock_quantity });

        return res.status(200).json(updatedProduct);
    }
}

export default new ProductController();