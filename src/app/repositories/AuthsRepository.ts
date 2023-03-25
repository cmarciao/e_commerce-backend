import { db } from "../../database";
import User from "../models/User";

interface ILogin {
    email: string;
    password: string;
}

class AuthsRepository {

    async findByEmailAndPassword({ email, password}: ILogin): Promise<User> {
        const {rows} = await db.query(`
            SELECT * FROM users
            WHERE email=$1 AND password=$2
        `, [email, password]);

        const [response] = rows;

        return response;
    }
    
}

export default new AuthsRepository();