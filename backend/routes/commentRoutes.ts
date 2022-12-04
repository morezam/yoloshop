import express from 'express';
import {
	createComment,
	deleteComment,
	getAllComments,
	likeComment,
} from '@controllers/comment';
import { protect } from '@middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getAllComments);
router.route('/').post(protect, createComment);
router.route('/:id/like').put(protect, likeComment);
router.route('/:id').delete(protect, deleteComment);

export default router;
