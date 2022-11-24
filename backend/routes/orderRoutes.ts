import express from 'express';
import {
	getOrders,
	getOrderById,
	createOrder,
	updateOrder,
} from '@controllers/order';

import { protect } from '@middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/').post(protect, createOrder);

router.route('/:id').patch(protect, updateOrder);
// router.route('/:id').delete(protect, deleteProduct);

export default router;
