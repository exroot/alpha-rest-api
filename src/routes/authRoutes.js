import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

//  Route: /auth/~login, logout, signup~
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.post('/signup', authController.postSignup);

export default router;
