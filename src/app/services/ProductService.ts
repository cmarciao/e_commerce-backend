import { AppError } from "../errors/AppError";
import Product from "../models/Product";
import ProductsRepository from "../repositories/ProductsRepository";

type ICreateProduct = Omit<Product, 'id'>

class ProductService {
    async listProducts() {
        const products = await ProductsRepository.findAll();
        return products;
    }

    async createProduct({ name, price, url_photo, stock_quantity}: ICreateProduct) { 
        const product = await ProductsRepository.create({
            name,
            price,
            url_photo,
            stock_quantity
        });

        return product;
    }

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