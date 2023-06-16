import { Request, Response } from "express";
import CartsRepository from "../repositories/CartsRepository";

import { emptyPropertyList } from "../utils/validator";
import { errorListFormatter } from "../utils/formatter";

import { AppError } from "../errors/AppError";
import UsersRepository from "../repositories/UsersRepository";
import ProductsRepository from "../repositories/ProductsRepository";
import CartItemsRepository from "../repositories/CartItemsRepository";

class CartController {
    async index(req: Request, res: Response) {
        const user_id = req.headers['x-user-id'] as string;

        const isUserExists = await UsersRepository.findById(user_id);

        if(!isUserExists) {
            throw new AppError('User not found!');
        }

        const cartDb = await CartsRepository.findByUserId(user_id);
        const cartItemsDb = await CartItemsRepository.listItemsByCartId(cartDb.id);
        const products = [];

        for(const item of cartItemsDb){
            const product = await ProductsRepository.findById(item.product_id);
            products.push({
                ...product,
                amount: item.amount
            });
        }

        const cart = {
            ...cartDb,
            products
        }

        return res.status(200).json(cart);
    }

    async store(req: Request, res: Response) {
        const { user_id, products_ids } = req.body;
        
        const errorsList = emptyPropertyList({ user_id, products_ids });

        if(errorsList.length) {
            const commentError = errorListFormatter(errorsList);
            
            throw new AppError(commentError);
        }

        const isUserExists = await UsersRepository.findById(user_id);

        if(!isUserExists) {
            throw new AppError('User not found!');
        }

        let total = 0;
        let amount = 0;

        for(const productId of products_ids) {
            const product = await ProductsRepository.findById(productId);

            if(!product) {
                throw new AppError('Product not found!');
            }

            amount++;
            total += product.price;
        }

        const cart = await CartsRepository.create({ user_id, amount, total });

        for(const productId of products_ids) {
            await CartItemsRepository.create({
                cart_id: cart.id,
                product_id: productId
            });
        };

        return res.status(201).json()
    }

    async delete(req: Request, res: Response) {
        const user_id = req.headers['x-user-id'] as string;
        const { id } = req.params;

        /** CHECK IF USER HAS PERMISSION TO DELETE CART */

        await CartItemsRepository.delete(id);

        return res.sendStatus(200);
    }
}

export default new CartController();