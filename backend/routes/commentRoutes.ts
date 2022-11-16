import { protect } from '@middleware/authMiddleware';
import express from 'express';
import { createComment, updateComment } from '@controllers/commentController';

const router = express.Router();

router.post('/', protect, createComment);
router.patch('/update', protect, updateComment);

export default router;
