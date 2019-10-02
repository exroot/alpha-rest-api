import { body } from 'express-validator';
import User from '../models/User';

const inputValidator = {
    notes: [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('body')
            .trim()
            .isLength({ min: 5 }),
    ],
    register: [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Please, provide a valid email.')
            .custom(async (value) => {
                const user = await User.findOne({ where: { email: value } });
                if (user) {
                    const error = new Error('Email is already taken.');
                    error.statusCode = 401;
                    throw error;
                }
            }),
        body('password')
            .trim()
            .isLength({ min: 6 }),
        body('confirmPassword')
            .trim()
            .custom(async (value, { req }) => {
                if (value !== req.body.password) {
                    const error = new Error("Passwords doesn't match.");
                    error.statusCode = 401;
                    throw error;
                }
            }),
    ],
    login: [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Please, provide a valid email.')
            .custom(async (value) => {
                const user = await User.findOne({ where: { email: value } });
                if (!user) {
                    const error = new Error("User isn't registered");
                    error.statusCode = 401;
                    throw error;
                }
            }),
        body('password')
            .trim()
            .isLength({ min: 6 }),
    ],
};

export default inputValidator;
