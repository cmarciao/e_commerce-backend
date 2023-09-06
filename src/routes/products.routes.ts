import { Router } from 'express';
import ProductController from '../app/controllers/ProductController';

const productRoutes = Router();

productRoutes.get('/', ProductController.index);
productRoutes.post('/', ProductController.store);
productRoutes.put('/:id', ProductController.update);

export { productRoutes };