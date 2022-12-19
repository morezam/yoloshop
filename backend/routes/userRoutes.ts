import express from 'express';
import { protect } from '@middleware/authMiddleware';
import {
	deleteUser,
	changePassword,
	updateUser,
} from '@controllers/user/editUser';
import {
	getFavoriteProducts,
	setFavoriteProduct,
	deleteFavoriteProduct,
} from '@controllers/user/favorites';
import {
	forgetPassword,
	verifySecurityNumber,
	changePasswordFromLogin,
} from '@controllers/user/forgetPass';
import {
	getUserProfile,
	getAllUsers,
	getUserComments,
	getUserOrders,
} from '@controllers/user/getUser';
import { userRegister, userLogin } from '@controllers/user/userSign';
import {
	resendVerificationEmail,
	userVerify,
} from '@controllers/user/verifyUser';

const router = express.Router();

router.route('/').post(userRegister);
router.route('/login').post(userLogin);
router.route('/profile').get(protect, getUserProfile);

router.route('/verify').get(userVerify);
router.route('/resend-verification-email').get(resendVerificationEmail);

router.route('/forget-password').post(forgetPassword);
router.route('/verify-secNum').post(verifySecurityNumber);
router.route('/change-password-login').post(changePasswordFromLogin);

router.route('/all').get(protect, getAllUsers);
router.route('/:id').delete(protect, deleteUser);
router.route('/:id/comments').get(protect, getUserComments);
router.route('/:id/orders').get(protect, getUserOrders);
router.route('/changePassword').put(protect, changePassword);
router.route('/:id').put(protect, updateUser);

router.route('/favorites').get(protect, getFavoriteProducts);
router.route('/favorites').post(protect, setFavoriteProduct);
router.route('/favorites/:prodId').delete(protect, deleteFavoriteProduct);

export default router;
