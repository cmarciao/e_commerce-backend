import { db } from "../../database";
import { Sale } from "../models/Sale";

class SalesRepository {
    async create(user_id: string, amount: number, price: number): Promise<Sale> {
        const {rows} = await db.query(`
            INSERT INTO sales(user_id, amount, price)
            VALUES ($1, $2, $3)
            RETURNING *
        `, [user_id, amount, price]);
        const [response] = rows;

        return response;
    }

    async findAllByUserId(user_id: string): Promise<Sale[]> {
        const { rows: response } = await db.query(`
            SELECT *
            FROM sales
            WHERE user_id = $1
        `, [user_id]);

        return response;
    }
}

export default new SalesRepository();