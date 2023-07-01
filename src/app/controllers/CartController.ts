import { Request, Response } from "express";
import CartService from "../services/CartService";

class CartController {
    async show(req: Request, res: Response) {
        const user_id = req.headers['x-user-id'] as string;

        const cart = await CartService.getCartByUserId(user_id);

        return res.status(200).json(cart);
    }

    async addProduct(req: Request, res: Response) {
        const user_id = req.headers['x-user-id'] as string;
        const { product_ids } = req.body;

        const cart = await CartService.addProducts(user_id, product_ids);

        return res.status(201).json(cart);
    }

    async removeProduct(req: Request, res: Response) {
        const user_id = req.headers['x-user-id'] as string;
        const { product_id } = req.body;

        const cart = await CartService.removeProduct(user_id, product_id)

        return res.status(200).json(cart);
    }
    
    async removeCartItem(req: Request, res: Response) {
        const user_id = req.headers['x-user-id'] as string;
        const { product_id } = req.body;

        const cart = await CartService.removeCartItem(user_id, product_id)

        return res.status(200).json(cart);
    }
}

export default new CartController();