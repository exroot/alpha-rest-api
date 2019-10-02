import User from '../models/User';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

exports.postLogin = async (req, res, next) => {
    const validationErrors = validationResult(req);
    const { email, password } = req.body;
    if (!validationErrors.isEmpty()) {
        return res
            .status(422)
            .json({ message: 'Error', data: validationErrors });
    }
    try {
        const user = await User.findOne({ where: { email: email } });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(404).json({
                message: 'Invalid combination of email and password.',
            });
        }
        return res.status(200).json({ message: `${user.email} is log in.` });
    } catch (err) {
        console.error(err);
    }
};

exports.postSignup = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res
            .status(422)
            .json({ message: 'Validation error.', data: validationErrors });
    }
    const { email, password } = req.body;
    try {
        const newUser = new User({
            email: email,
            password: await bcrypt.hash(password, 12),
        });
        await newUser.save();
        return res.json(200).json({ message: 'User has been registered.' });
    } catch (err) {
        console.error(err);
    }
};
