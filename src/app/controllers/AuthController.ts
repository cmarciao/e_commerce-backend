import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";

import { errorListFormatter } from "../../utils/formatter";
import { emptyPropertyList } from "../../utils/validator";

import AuthsRepository from "../repositories/AuthsRepository";

class AuthController {
    async login(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const errorsList = emptyPropertyList({ email, password });

        if(errorsList.length) {
            const commentError = errorListFormatter(errorsList);
            
            throw new AppError(commentError);
        }

        const isUserExists = await AuthsRepository.findByEmailAndPassword({ email, password });

        if(!isUserExists) {
            return res.status(404).json("Email or password is incorrect.");
        }

        return res.status(200).json("User logged in successfully");
    }
}

export default new AuthController();