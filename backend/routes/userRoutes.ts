import express from 'express';
import { userRegister } from '../controllers/userController';

const router = express.Router();

router.get('/register', userRegister);

export default router;
