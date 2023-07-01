import { AppError } from "../errors/AppError";
import ProductsRepository from "../repositories/ProductsRepository";

class ProductService {
    async isProductsExists(product_ids: string[]) {
        for(const productId of product_ids) {
            const product = await ProductsRepository.findById(productId);
            
            if(!product) {
                return false;
            }
        }

        return true;
    }
}

export default new ProductService();