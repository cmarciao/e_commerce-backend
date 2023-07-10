import { AppError } from "../errors/AppError";
import { Cart } from "../models/Cart";
import { CartResponse } from "../models/CartResponse";
import CartItemsRepository from "../repositories/CartItemsRepository";
import CartsRepository from "../repositories/CartsRepository";
import ProductsRepository from "../repositories/ProductsRepository";
import UsersRepository from "../repositories/UsersRepository";
import CartItemService from "./CartItemService";
import ProductService from "./ProductService";

class CartService {
    async getCartByUserId(user_id: string) {
        const isUserExists = await UsersRepository.findById(user_id);

        if(!isUserExists) {
            throw new AppError('User not found!');
        }
        
        const cartDb = await CartsRepository.findByUserId(user_id);

        if(!cartDb) {
            const cartCreated = await CartsRepository.create({ user_id, amount: 0, total: 0 });
            const cart = {
                ...cartCreated,
                products: []
            }

            return cart;
        }

        const cartItemsDb = await CartItemsRepository.listItemsByCartId(cartDb.id);

        if(!cartItemsDb) {
            return cartDb;
        }

        const products = [];
        
        for(const item of cartItemsDb) {
            const product = await ProductsRepository.findById(item.product_id);
            products.push({
                ...product,
                amount: item.amount
            });
        }

        const cart: CartResponse = {
            ...cartDb,
            products
        }

        return cart;
    }

    async addProducts(user_id: string, product_ids: string[]) {
        const isUserExists = await UsersRepository.findById(user_id);
        if(!isUserExists) {
            throw new AppError('User not exists!');
        }

        const isProductsExists = await ProductService.isProductsExists(product_ids);
        if(!isProductsExists) {
            throw new AppError('Some product not exists!');
        }
        
        const cartDb = await CartsRepository.findByUserId(user_id);
        if(!cartDb) {
            throw new AppError('Cart not exists!');
        }

        await CartItemService.createProducts(cartDb, product_ids);
        
        const cartItemsDb = await CartItemsRepository.listItemsByCartId(cartDb.id);        
        const products = [];
        
        for(const item of cartItemsDb) {
            const product = await ProductsRepository.findById(item.product_id);
            products.push({
                ...product,
                amount: item.amount
            });
        }

        const amount = await CartItemsRepository.getProductsAmount(cartDb.id);
        const total = await CartItemsRepository.getCartItemsTotalPrice(cartDb.id);

        await CartsRepository.update(cartDb.id, amount, total, new Date());

        const cart: CartResponse = {
            ...cartDb,
            products,
            amount,
            total
        }

        return cart;
    }

    async removeProduct(user_id: string, product_id: string) {
        const isUserExists = await UsersRepository.findById(user_id);
        if(!isUserExists) {
            throw new AppError('User not exists!');
        }

        const cartDb = await CartsRepository.findByUserId(user_id);
        if(!cartDb) {
            throw new AppError('Cart not exists!');
        }

        if(cartDb.amount == 0) {
            return cartDb;
        }

        const product = await ProductsRepository.findById(product_id);
        if(!product) {
            throw new AppError('Product not exists!');
        }
        
        await CartItemsRepository.deleteOneItemByProductId(product_id);

        
        return this.listCartItemsUpdated(cartDb, user_id);
    }

    async removeCartItem(user_id: string, product_id: string) {
        const isUserExists = await UsersRepository.findById(user_id);
        if(!isUserExists) {
            throw new AppError('User not exists!');
        }

        const cartDb = await CartsRepository.findByUserId(user_id);
        if(!cartDb) {
            throw new AppError('Cart not exists!');
        }

        if(cartDb.amount == 0) {
            return cartDb;
        }

        const product = await ProductsRepository.findById(product_id);
        if(!product) {
            throw new AppError('Product not exists!');
        }
        
        await CartItemsRepository.deleteAllItemsByProductId(product_id);

        return this.listCartItemsUpdated(cartDb, user_id);
    }

    private async listCartItemsUpdated(cartDb: Cart, user_id: string) {
        const cartItemsDb = await CartItemsRepository.listItemsByCartId(cartDb.id);

        if(cartItemsDb.length == 0) {
            await CartsRepository.update(cartDb.id, 0, 0, new Date());
            const cartResponse = await CartsRepository.findByUserId(user_id);

            const cart: CartResponse = {
                ...cartResponse,
                products: []
            }
            
            return cart;
        }

        const products = [];
        for(const item of cartItemsDb) {
            const product = await ProductsRepository.findById(item.product_id);
            products.push({
                ...product,
                amount: item.amount
            });
        }

        const amount = await CartItemsRepository.getProductsAmount(cartDb.id);
        const total = await CartItemsRepository.getCartItemsTotalPrice(cartDb.id);

        await CartsRepository.update(cartDb.id, amount, total, new Date());

        const cart: CartResponse = {
            ...cartDb,
            total,
            amount,
            products
        }

        return cart;
    }
}

export default new CartService();