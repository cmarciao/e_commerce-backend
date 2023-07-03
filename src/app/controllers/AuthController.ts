import { Request, Response } from "express";
import AuthService from "../services/AuthService";

class AuthController {
    async store(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const token = await AuthService.loginByEmailAndPassword(email, password);

        return res.status(200).json(token);
    }

    async show(req: Request, res: Response) {
        const token = req.headers.authorization || '';
        
        const user = await AuthService.getCurrentLoggedUser(token);
        
        return res.status(200).json(user);
    }
}

export default new AuthController();