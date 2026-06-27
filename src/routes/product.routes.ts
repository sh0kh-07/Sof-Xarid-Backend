import { Router } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller';
import { upload } from '../middlewares/upload';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authenticate, upload.single('image'), createProduct);
router.put('/:id', authenticate, upload.single('image'), updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
