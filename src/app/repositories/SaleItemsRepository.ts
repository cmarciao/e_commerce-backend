import { db } from "../../database";

class SaleItems {
    async create(sale_id: string, product_id: string, amount: number) {
        await db.query(`
            INSERT INTO sale_items(sale_id, product_id, amount)
            VALUES ($1, $2, $3);
        `, [sale_id, product_id, amount]);
    }

    async findSalesProductsBySaleId(sale_id: string) {
        const { rows } = await db.query(`
            SELECT amount, name, url_photo, price
            FROM sale_items AS si
            JOIN products AS p
            ON si.product_id = p.id
            WHERE sale_id = $1;
        `, [sale_id]);
        return rows;
    }
}

export default new SaleItems();