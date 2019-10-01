import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

//  Route: /auth/<login, signup>
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);

export default router;
