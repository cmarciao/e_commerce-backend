import { Router } from "express";

import SaleController from "../app/controllers/SaleController";

const salesRoutes = Router();

salesRoutes.get('/', SaleController.index);

export { salesRoutes };