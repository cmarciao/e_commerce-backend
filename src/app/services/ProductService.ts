import { AppError } from '../errors/AppError';
import Product from '../models/Product';
import ProductsRepository from '../repositories/ProductsRepository';

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

    async updateProduct({ id, name, price, url_photo, stock_quantity}: Product) {
        const product = await this.getProduct(id);

        if(!product) {
            throw new AppError('Product not exists, please, you must first create a product.');
        }

        if(stock_quantity < 0) {
            throw new AppError('Invalid sotck quantity.');
        }

        const newProduct = {
            id: product.id, 
            name: name || product.name,
            price: price || product.price,
            url_photo: url_photo || product.url_photo,
            stock_quantity: stock_quantity || product.stock_quantity
        };

        const updatedProduct = await ProductsRepository.update(newProduct);
        return updatedProduct;
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

    async getProduct(id: string) {
        const product = await ProductsRepository.findById(id);
        return product;
    }
}

export default new ProductService();