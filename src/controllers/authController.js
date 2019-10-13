import 'dotenv/config';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

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
		
		if (!user) {
			const error = new Error("User isn't registered");
			error.statusCode = 401;
			throw error;
		}
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            const error = new Error(
                'Invalid combination of email and password.'
            );
            error.statusCode = 422;
            error.data = 'Invalid combination of email and password.';
            throw error;
        }
        const token = jwt.sign(
            { email: user.email, userId: user.id },
            process.env.PRIVATE,
            { expiresIn: '1h' }
        );
        return res.status(200).json({ userId: user.id, email: user.email, token: token });
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
