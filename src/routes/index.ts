import { Router } from "express";

import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { productRoutes } from "./products.routes";
import { cartRoutes } from "./cart.routes";

const routes = Router();

routes.use("/", authRoutes);
routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/carts", cartRoutes);

export { routes };