exports.get404 = (req, res, next) => {
    const error = new Error('Error 404: page not found');
    error.statusCode = 404;
    next(error);
};
