import { AppError } from "../errors/AppError";
import { Cart } from "../models/Cart";

import CartItemsRepository from "../repositories/CartItemsRepository";
import ProductsRepository from "../repositories/ProductsRepository";

interface IReduce {
    id: string;
    amount: number;
}

class CartItemService {
    async createProducts(cart: Cart, product_ids: string[]) {
        const products = product_ids.reduce((acc, product_id) => {
            if(!acc.find((item) => item.id === product_id)) {
                acc.push({
                    id: product_id,
                    amount: 1
                });

                return acc;
            }
            const index = acc.findIndex(item => item.id === product_id);
            acc[index].amount = acc[index].amount + 1;

            return acc;
        }, [] as IReduce[]);

        for(const product of products) {
            const hasProduct = await this.hasProductsInStock(product);
            if(!hasProduct) {
                console.log(product);
            }
        }

        for(const productId of product_ids) {
            await CartItemsRepository.create({
                cart_id: cart.id,
                product_id: productId
            });
        };
    }

    async hasProductsInStock(product: IReduce) {
        const productDb = await ProductsRepository.findById(product.id);
        const productAmount = await CartItemsRepository.getProductsAmountById(product.id);
        const hasProductsInStock = Number(product.amount) + Number(productAmount) <= Number(productDb.stock_quantity);

        if(!hasProductsInStock) {
            const quantityAvailable = Number(productDb.stock_quantity) - Number(productAmount);

            if(quantityAvailable == 0) {
                throw new AppError('No more products in stock.');
            }
            
            const comment = quantityAvailable === 1 ? 'item' : 'itens';
            throw new AppError(`The "${productDb.name}" has just ${quantityAvailable} ${comment} in stock.`, 400);
        }
        
        return hasProductsInStock;
    }
}

export default new CartItemService();