import { Router } from "express";
import CartController from "../app/controllers/CartController";

const cartRoutes = Router();

cartRoutes.get('/', CartController.index);
cartRoutes.post('/', CartController.store);
cartRoutes.delete('/:id', CartController.delete);

export { cartRoutes };