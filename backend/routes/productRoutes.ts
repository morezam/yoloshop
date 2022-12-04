import express from 'express';
import {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
	getCommentsByProductId,
} from '@controllers/product';
import { protect } from '@middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/').post(protect, createProduct);

router.route('/:id').get(getProductById);
router.route('/:id/comments').get(getCommentsByProductId);
router.route('/:id').put(protect, updateProduct);
router.route('/:id').delete(protect, deleteProduct);

export default router;
