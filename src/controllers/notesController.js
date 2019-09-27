exports.getNotes = (req, res, next) => {
    res.status(200).send('/notes page');
};
exports.postNotes = (req, res, next) => {};
exports.getSingleNote = (req, res, next) => {
    res.status(200).send(`note ${req.params.id} page.`);
};
exports.updateNote = (req, res, next) => {};
exports.deleteNote = (req, res, next) => {};
