import express from 'express';
import {
	userRegister,
	userLogin,
	getUserProfile,
} from '@controllers/userController';
import { protect } from '@middleware/authMiddleware';

const router = express.Router();

router.route('/register').post(userRegister);
router.route('/login').post(userLogin);
router.route('/profile').get(protect, getUserProfile);

export default router;
