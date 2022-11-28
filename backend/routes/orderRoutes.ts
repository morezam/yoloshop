import express from 'express';
import {
	getOrders,
	getOrderById,
	createOrder,
	updateOrder,
	payOrder,
	deliverOrder,
} from '@controllers/order';

import { protect } from '@middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/').post(protect, createOrder);

router.route('/:id').put(protect, updateOrder);
router.route('/:id/payOrder').put(protect, payOrder);
router.route('/:id/deliverOrder').put(protect, deliverOrder);

export default router;
