exports.getLogin = (req, res, next) => {
    res.status(200).send('/login page');
};
exports.postLogin = (req, res, next) => {};

exports.getSignup = (req, res, next) => {
    res.status(200).send('/signup page');
};
exports.postSignup = (req, res, next) => {};
