import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

import { errorListFormatter } from "../utils/formatter";
import { emptyPropertyList } from "../utils/validator";

import UsersRepository from "../repositories/UsersRepository";
import { compareEncrypt } from "../utils/crypt";

dotenv.config();

class AuthController {
    async store(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const errorsList = emptyPropertyList({ email, password });

        if(errorsList.length) {
            const commentError = errorListFormatter(errorsList);
            
            throw new AppError(commentError);
        }

        const userByEmail = await UsersRepository.findByEmail(email);

        if(!userByEmail) {
            return res.status(404).json("Email or password is incorrect.");
        }

        const isValidPassword = await compareEncrypt(password, userByEmail.password);

        if(!isValidPassword) {
            throw new AppError('Email or password is invalid.', 404);
        }
        

        const {id} = userByEmail;
        const token = jwt.sign({ id }, `${process.env.JWT_SECRET_KEY}`);

        return res.status(200).json(token);
    }
}

export default new AuthController();