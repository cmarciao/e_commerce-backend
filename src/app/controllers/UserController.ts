import { Request, Response } from "express";
import { AppError } from "../errors/AppError";

import { encryptData } from "../utils/crypt";
import { errorListFormatter } from "../utils/formatter";
import { emptyPropertyList } from "../utils/validator";

import UsersRepository from "../repositories/UsersRepository";

class UserController {
    async index(req: Request, res: Response) {
        const user = await UsersRepository.findAll();
        return res.status(200).json(user);
    }

    async store(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const errorsList = emptyPropertyList({ name, email, password });

        if(errorsList.length) {
            const commentError = errorListFormatter(errorsList);
            
            throw new AppError(commentError);
        }

        const userAlreadyExists = await UsersRepository.findByEmail(email);
        
        if(userAlreadyExists) {
            throw new AppError("User already exists.");
        }
        
        const encryptedPassword = await encryptData(password);
        const user = await UsersRepository.create({
            name,
            email,
            password: encryptedPassword
        });

        return res.status(201).json(user);
    }
}

export default new UserController();