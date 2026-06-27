import { Router } from 'express';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/order.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrder);
router.post('/', authenticate, createOrder);
router.put('/:id', authenticate, updateOrder);
router.patch('/:id/status', authenticate, updateOrderStatus);
router.delete('/:id', authenticate, deleteOrder);

export default router;