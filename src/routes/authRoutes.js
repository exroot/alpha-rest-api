import { Router } from 'express';
import authController from '../controllers/authController';
import inputValidator from '../middlewares/inputValidations';

const router = Router();

//  Route: /auth/<login, signup>
router.post('/login', inputValidator.login, authController.postLogin);
router.post('/signup', inputValidator.register, authController.postSignup);

export default router;
