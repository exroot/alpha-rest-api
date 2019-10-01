import User from '../models/User';
import bcrypt from 'bcrypt';

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "User isn't registered.",
            });
        }
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
    const { email, password, confirmPassword } = req.body;
    try {
        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            return res
                .status(400)
                .json({ message: 'That email is already registered.' });
        }
        const newUser = new User({
            email: email,
            password:
                password === confirmPassword
                    ? await bcrypt.hash(password, 12)
                    : null,
        });
        if (!newUser.password) {
            return res.status(400).json({ message: 'Passwords must match.' });
        }
        await newUser.save();
        return res.json(200).json({ message: 'User has been registered.' });
    } catch (err) {
        console.error(err);
    }
};
