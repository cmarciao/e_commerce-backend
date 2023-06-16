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
            SELECT ci.*, 
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

    async delete(id: string) {
        await db.query(`
            DELETE FROM cart_items
            WHERE product_id = $1
        `, [id]);
    }
}

export default new CartItemsRepository();