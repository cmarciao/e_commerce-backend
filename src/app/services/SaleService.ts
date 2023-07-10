import { AppError } from "../errors/AppError";

import CartsRepository from "../repositories/CartsRepository";
import UsersRepository from "../repositories/UsersRepository";
import CartItemsRepository from "../repositories/CartItemsRepository";
import ProductsRepository from "../repositories/ProductsRepository";
import SalesRepository from "../repositories/SalesRepository";
import SaleItemsRepository from "../repositories/SaleItemsRepository";

class SaleService {
    async getSalesByUserId(user_id: string) {
        const isUserExists = await UsersRepository.findById(user_id);
        if(!isUserExists) {
            throw new AppError('User not exists!');
        }

        const salesDb = await SalesRepository.findAllByUserId(user_id);
        
        if(!salesDb) {
            return [];
        }

        const sales = [];

        for(const saleDb of salesDb) {
            const saleProductItems = await SaleItemsRepository.findSalesProductsBySaleId(saleDb.id);
            sales.push({
                ...saleDb,
                user_id: undefined,
                products: [
                    ...saleProductItems
                ]
            });
        }

        return sales;
    }

    async addNewSale(user_id: string) {
        const isUserExists = await UsersRepository.findById(user_id);
        if(!isUserExists) {
            throw new AppError('User not exists!');
        }
        
        const cart = await CartsRepository.findByUserId(user_id);
        if(!cart) {
            throw new AppError('Cart not exists!');
        }

        const sale = await SalesRepository.create(user_id, cart.amount, cart.total);        
        const cartItemsDb = await CartItemsRepository.listItemsByCartId(cart.id);

        for(const item of cartItemsDb) {
            const product = await ProductsRepository.findById(item.product_id);

            await ProductsRepository.updateStockQuantityById(product.id, product.stock_quantity - item.amount);
            await SaleItemsRepository.create(sale.id, product.id, item.amount);
            await CartItemsRepository.deleteAllItemsByProductId(product.id);
        }

        await CartsRepository.delete(cart.id); 
    }
}

export default new SaleService();