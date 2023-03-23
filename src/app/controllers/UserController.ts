import { Request, Response } from "express";

import { encryptData } from "../../utils/crypt";
import { errorListFormatter } from "../../utils/formatter";
import { emptyPropertyList } from "../../utils/validator";

import UsersRepository from "../repositories/UsersRepository";

class UserController {
    async store(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const errorsList = emptyPropertyList({ name, email, password });

        if(errorsList.length) {
            const commentError = errorListFormatter(errorsList);

            return res.status(400).json({
                error: commentError
            });
        }

        const userAlreadyExists = await UsersRepository.findByEmail(email);
        
        if(userAlreadyExists) {
            return res.status(400).json({
                error: "User already exists."
            });
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