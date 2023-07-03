import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
    async store(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const user = await UserService.createUser(name, email, password);

        return res.status(201).json(user);
    }
}

export default new UserController();