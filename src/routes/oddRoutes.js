import express from 'express';
import errorController from '../controllers/errorController';

const router = express.Router();

router.use(errorController.get404);

export default router;
