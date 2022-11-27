import express from 'express';
import {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} from '@controllers/product';
import {
	createProductComment,
	deleteProductComment,
} from '@controllers/comment';
import { protect } from '@middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/').post(protect, createProduct);

router.route('/:id').get(getProductById);
router.route('/:id').put(protect, updateProduct);
router.route('/:id').delete(protect, deleteProduct);

router.route('/:id/comments').post(protect, createProductComment);
router.route('/:id/comments/:commentId').delete(protect, deleteProductComment);

export default router;
