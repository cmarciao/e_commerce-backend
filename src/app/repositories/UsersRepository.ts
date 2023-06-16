import User from "../models/User";

import { db } from "../../database";

interface CreateUserProps {
    name: string;
    email: string;
    password: string;
}

class UsersRepository {
    async findAll(): Promise<User[][]> {
        const { rows } = await db.query<User[]>(`
            SELECT *
            FROM users
        `);

        return rows;
    }

    async findById(id: string) {
        const { rows } = await db.query(`
            SELECT *
            FROM users
            WHERE id = $1
        `, [id]);
        const [response] = rows;

        return response;
    }

    async findByEmail(email: string): Promise<User> {
        const { rows } = await db.query<User>(`
            SELECT *
            FROM users
            WHERE email = $1
        `, [email]);

        const [response] = rows;

        return response;
    }
    
    async create(user: CreateUserProps): Promise<User> {
        const { name, email, password } = user;
        
        const { rows } = await db.query<User>(`
            INSERT INTO users(name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *`
        , [name, email, password]);
        
        const [response] = rows;

        return response;
    }
}

export default new UsersRepository();