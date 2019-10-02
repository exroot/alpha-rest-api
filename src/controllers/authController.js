import User from '../models/User';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

exports.postLogin = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = validationErrors.array();
            throw error;
        }
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            const error = new Error(
                'Invalid combination of email and password.'
            );
            error.statusCode = 422;
            error.data = 'Invalid combination of email and password.';
            throw error;
        }
        return res.status(202).json({ message: `${user.email} is log in.` });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.data = 'Server error.';
        }
        next(err);
    }
};

exports.postSignup = async (req, res, next) => {
    try {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = validationErrors.array();
            throw error;
        }
        const { email, password } = req.body;
        const newUser = new User({
            email: email,
            password: await bcrypt.hash(password, 12),
        });
        await newUser.save();
        return res.json(201).json({ message: 'User has been registered.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.data = 'Server error.';
        }
        next(err);
    }
};
