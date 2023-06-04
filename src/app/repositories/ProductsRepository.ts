import { db } from "../../database";
import Product from "../models/Product";

type ICreateProduct = Omit<Product, 'id'>

class ProductsRepository {
    async findAll() {
        const {rows: response} = await db.query("SELECT * FROM products");
        return response;
    }

    async create({ name, price, url_photo, stock_quantity }: ICreateProduct) {
        const {rows} = await db.query(`
            INSERT INTO products (name, price, url_photo, stock_quantity)
            VALUES ($1, $2, $3, $4)
        `, [name, price, url_photo, stock_quantity]);
        const [response] = rows;

        return response;
    }
}

export default new ProductsRepository();