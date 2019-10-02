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
            .custom(async (value, { req }) => {
                const user = await User.findOne({ where: { email: value } });
                if (user) {
                    return Promise.reject('Email is already taken.');
                }
            }),
        body('password')
            .trim()
            .isLength({ min: 6 }),
        body('confirmPassword')
            .trim()
            .custom(async (value, { req }) => {
                if (value !== req.body.password) {
                    return Promise.reject("Passwords doesn't match.");
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
                    return Promise.reject("User isn't registered");
                }
            }),
        body('password')
            .trim()
            .isLength({ min: 6 }),
    ],
};

export default inputValidator;
