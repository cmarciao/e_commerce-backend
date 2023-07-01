import { Cart } from "../models/Cart";
import CartItemsRepository from "../repositories/CartItemsRepository";

class CartItemService {
    async createProducts(cart: Cart, product_ids: string[]) {
        for(const productId of product_ids) {
            await CartItemsRepository.create({
                cart_id: cart.id,
                product_id: productId
            });
        };
    } 
}

export default new CartItemService();