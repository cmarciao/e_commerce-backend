import { Router } from "express";

import CartController from "../app/controllers/CartController";
import SaleController from "../app/controllers/SaleController";

const cartRoutes = Router();

cartRoutes.get('/', CartController.show);
cartRoutes.patch('/add-products', CartController.addProduct);
cartRoutes.patch('/remove-products', CartController.removeProduct);
cartRoutes.patch('/remove-cart-items', CartController.removeCartItem);
cartRoutes.post('/confirm', SaleController.store);

export { cartRoutes };