import { db } from '../../database';
import Product from '../models/Product';

type ICreateProduct = Omit<Product, 'id'>

class ProductsRepository {
    async findAll() {
        const {rows: response} = await db.query(`
            SELECT *
            FROM products
            WHERE stock_quantity != 0;
        `);
        return response;
    }

    async findById(productId: string): Promise<Product> {
        const {rows: [response]} = await db.query(
            'SELECT * FROM products WHERE id=$1', 
            [productId]
        );
        
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

    async update({ id, name, price, url_photo, stock_quantity }: Product) {
        const {rows} = await db.query(`
            UPDATE products
            SET
                name=$1,
                price=$2,
                url_photo=$3,
                stock_quantity=$4
            WHERE id=$5
            RETURNING *;
        `, [name, price, url_photo, stock_quantity, id]);
        const [response] = rows;

        return response;
    }

    async updateStockQuantityById(product_id: string, stock_quantity: number) {
        await db.query(`
            UPDATE products
            SET stock_quantity=$1
            WHERE id = $2;
        `, [stock_quantity, product_id]);
    }
}

export default new ProductsRepository();