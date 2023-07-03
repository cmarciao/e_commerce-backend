import jwt from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { compareEncrypt } from "../utils/crypt";
import UsersRepository from "../repositories/UsersRepository";

interface DecodedToken {
    id: string;
    iat: number;
}

class AuthService {
    async loginByEmailAndPassword(email: string, password: string) {
        const userByEmail = await UsersRepository.findByEmail(email);

        if(!userByEmail) {
            throw new AppError('Email or password is incorrect.');
        }

        const isValidPassword = await compareEncrypt(password, userByEmail.password);

        if(!isValidPassword) {
            throw new AppError('Email or password is invalid.');
        }
        

        const {id} = userByEmail;
        const token = jwt.sign({ id }, `${process.env.JWT_SECRET_KEY}`);

        return token;
    }

    async getCurrentLoggedUser(token: string) {
        try {
            const decodedToken = token.split(' ')[1];
            const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET_KEY || '') as DecodedToken;
            const user = await UsersRepository.findById(decoded.id);
            
            return user;
        } catch {
            throw new AppError('Invalid token', 401);
        }
    }
}

export default new AuthService();