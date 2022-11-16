import express from 'express';
import {
	getProducts,
	getProductById,
	createProduct,
} from '@controllers/productController';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/').post(createProduct);

router.get('/:id', getProductById);

router;

export default router;
