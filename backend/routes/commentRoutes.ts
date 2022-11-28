import express from 'express';

import {
	createProductComment,
	deleteProductComment,
	getCommentsByProductId,
	getComments,
	likeComment,
} from '@controllers/comment';
import { protect } from '@middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getComments);
router.route('/:prodId').get(getCommentsByProductId);
router.route('/').post(protect, createProductComment);
router.route('/:id/like').put(protect, likeComment);
// router.route('/:id').put(protect, deleteProductComment);
// router.route('/:id').delete(protect, deleteProductComment);
router.route('/:id').delete(protect, deleteProductComment);

export default router;
