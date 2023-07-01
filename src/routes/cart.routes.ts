import { Router } from "express";
import CartController from "../app/controllers/CartController";

const cartRoutes = Router();

cartRoutes.get('/', CartController.show);
cartRoutes.patch('/add-products', CartController.addProduct);
cartRoutes.patch('/remove-products', CartController.removeProduct);
cartRoutes.patch('/remove-cart-items', CartController.removeCartItem);

export { cartRoutes };