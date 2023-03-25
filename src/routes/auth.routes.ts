import { Router } from "express";
import AuthController from "../app/controllers/AuthController";

const authRoutes = Router();

authRoutes.post('/login', AuthController.login);

export { authRoutes };