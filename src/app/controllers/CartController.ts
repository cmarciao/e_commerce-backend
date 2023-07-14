import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

import { AppError } from "../errors/AppError";
import CartService from "../services/CartService";

interface DecodedToken {
    id: string;
    iat: number;
}

class CartController {
    async show(req: Request, res: Response) {
        const tokenHeader = req.headers.authorization;
        
        try {
            const token = tokenHeader?.split(' ')[1] || '';
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as DecodedToken;
            const cart = await CartService.getCartByUserId(decoded.id);
            
            return res.status(200).json(cart);
        } catch(err) {
            console.log(err);
            
            if(err instanceof AppError) {
                throw err;
            }

            throw new AppError('Invalid token', 401);
        }
    }
    
    async addProduct(req: Request, res: Response) {
        const { product_ids } = req.body;
        const tokenHeader = req.headers.authorization;
        
        try {
            const token = tokenHeader?.split(' ')[1] || '';
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as DecodedToken;
            const cart = await CartService.addProducts(decoded.id, product_ids);
    
            return res.status(201).json(cart);
        } catch(err) {
            console.log(err);
            
            if(err instanceof AppError) {
                throw err;
            }

            throw new AppError('Invalid token', 401);
        }
    }

    async removeProduct(req: Request, res: Response) {
        const { product_id } = req.body;
        const tokenHeader = req.headers.authorization;
        
        try {
            const token = tokenHeader?.split(' ')[1] || '';
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as DecodedToken;

            const cart = await CartService.removeProduct(decoded.id, product_id)

            return res.status(200).json(cart);
        } catch(err) {
            console.log(err);
            
            if(err instanceof AppError) {
                throw err;
            }

            throw new AppError('Invalid token', 401);
        }
    }
    
    async removeCartItem(req: Request, res: Response) {
        const { product_id } = req.body;
        const tokenHeader = req.headers.authorization;
        
        try {
            const token = tokenHeader?.split(' ')[1] || '';
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as DecodedToken;

            const cart = await CartService.removeCartItem(decoded.id, product_id)

            return res.status(200).json(cart);
        } catch(err) {
            console.log(err);
            
            if(err instanceof AppError) {
                throw err;
            }

            throw new AppError('Invalid token', 401);
        }
    }
}

export default new CartController();