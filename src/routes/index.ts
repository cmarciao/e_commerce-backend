import { Router } from "express";

import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { productRoutes } from "./products.routes";
import { cartRoutes } from "./cart.routes";
import { areFilledFields } from "../app/middlewares/isEmptyPropertyList";

const routes = Router();

routes.use("/", authRoutes);
routes.use("/users", userRoutes);

routes.use(areFilledFields);

routes.use("/products", productRoutes);
routes.use("/carts", cartRoutes);

export { routes };