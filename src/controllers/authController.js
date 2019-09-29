exports.postLogin = (req, res, next) => {
    res.status(200).json({ message: 'login succesfull' });
};
exports.postSignup = (req, res, next) => {
    res.status(200).json({ message: 'register succesfull' });
};
exports.postLogout = (req, res, next) => {
    res.status(200).json({ message: 'logout succesfull' });
};
