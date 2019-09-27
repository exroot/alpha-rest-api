exports.get404 = (req, res, next) => {
    res.status(404).send('Error 404: page not found');
};
