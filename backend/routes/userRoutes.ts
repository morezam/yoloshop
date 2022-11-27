import express from 'express';
import {
	userRegister,
	userLogin,
	getUserProfile,
	getAllUsers,
	deleteUser,
	changePassword,
	updateUser,
	getFavoriteProducts,
	setFavoriteProduct,
	deleteFavoriteProduct,
	userVerify,
	forgetPassword,
	verifySecurityNumber,
	changePasswordFromLogin,
} from '@controllers/user';
import { protect } from '@middleware/authMiddleware';

const router = express.Router();

router.route('/').post(userRegister);
router.route('/login').post(userLogin);
router.route('/profile').get(protect, getUserProfile);

router.route('/verify').get(userVerify);

router.route('/forget-password').post(forgetPassword);
router.route('/verify-secNum').post(verifySecurityNumber);
router.route('/change-password-login').post(changePasswordFromLogin);

router.route('/all').get(protect, getAllUsers);
router.route('/:id').delete(protect, deleteUser);
router.route('/changePassword').put(protect, changePassword);
router.route('/:id').put(protect, updateUser);

router.route('/favorites').get(protect, getFavoriteProducts);
router.route('/favorites').post(protect, setFavoriteProduct);
router.route('/favorites/:prodId').delete(protect, deleteFavoriteProduct);

export default router;
