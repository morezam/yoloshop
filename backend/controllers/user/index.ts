import { userRegister, userLogin } from './userSign';
import { getUserProfile, getAllUsers } from './getUser';
import { changePassword, deleteUser, updateUser } from './editUser';
import {
	getFavoriteProducts,
	setFavoriteProduct,
	deleteFavoriteProduct,
} from './favorites';
import { userVerify } from './verifyUser';
import {
	forgetPassword,
	verifySecurityNumber,
	changePasswordFromLogin,
} from './forgetPass';

export {
	userRegister,
	userLogin,
	getUserProfile,
	getAllUsers,
	changePassword,
	deleteUser,
	updateUser,
	getFavoriteProducts,
	setFavoriteProduct,
	deleteFavoriteProduct,
	userVerify,
	forgetPassword,
	verifySecurityNumber,
	changePasswordFromLogin,
};
