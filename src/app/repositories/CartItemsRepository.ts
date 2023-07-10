import { db } from "../../database";
import { CartItem } from "../models/CartItem";

type ICreateCartItem = Partial<CartItem>;

class CartItemsRepository {
    async create({ cart_id, product_id  }: ICreateCartItem) {
        const { rows } = await db.query(`
            INSERT INTO cart_items (cart_id, product_id)
            VALUES($1, $2)
            RETURNING *
        `, [cart_id, product_id]);
        const [response] = rows;

        return response;
    }

    async listItemsByCartId(cart_id: string): Promise<CartItem[]> {
        const { rows } = await db.query(`
            SELECT DISTINCT ON(ci.product_id) ci.*, 
                (
                    SELECT COUNT(*)
                    FROM cart_items
                    WHERE product_id = ci.product_id
                ) AS amount
            FROM cart_items AS ci
            WHERE ci.cart_id = $1
        `, [cart_id]);

        return rows;
    }

    async getProductsAmount(cart_id: string) {
        const { rows } = await db.query(`
            SELECT COUNT(*) AS amount
            FROM cart_items
            WHERE cart_id = $1
        `, [cart_id]);
        const [response] = rows;
        
        return response.amount;
    }
    
    async getCartItemsTotalPrice(cart_id: string) {
        const { rows } = await db.query(`
        SELECT SUM(p.price) AS total
        FROM cart_items AS c
        JOIN products AS p
        ON p.id = c.product_id
        WHERE c.cart_id = $1
        `, [cart_id]);
        const [response] = rows;
        
        return response.total;
    }

    async deleteAllItemsByProductId(product_id: string) {
        await db.query(`
            DELETE FROM cart_items
            WHERE product_id = $1
        `, [product_id]);
    }

    async deleteOneItemByProductId(product_id: string) {
        await db.query(`
            DELETE FROM cart_items
            WHERE id IN (
                SELECT id
                FROM cart_items
                WHERE product_id = $1
                ORDER BY id DESC
                LIMIT 1
            );
        `, [product_id]);
    }
}

export default new CartItemsRepository();