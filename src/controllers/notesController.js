import Note from '../models/Note';
import User from '../models/User';
import { validationResult } from 'express-validator';

exports.getAllNotes = async (req, res, next) => {
    try {
        const Notes = await Note.findAll();
        return res.status(200).json(Notes);
    } catch (err) {
        next(err);
    }
};

exports.postNotes = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed',
        });
    }
    const { title, body } = req.body;
    const newNote = new Note({
        title: title,
        body: body,
        userId: req.userId,
    });
    try {
        await newNote.save();
        return res.status(202).json({ message: 'Note created.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getNote = async (req, res, next) => {
    const id = req.params.id;
    try {
        const note = await Note.findByPk(id);
        if (!note) {
            const error = new Error('Note not found.');
            error.statusCode = 404;
            throw error;
        }
        return res.status(202).json(note);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.updateNote = async (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failedasdas.',
            data: validationErrors,
        });
    }
    const noteId = req.params.id;
    const { title, body } = req.body;
    try {
        const updatedNote = await Note.findByPk(noteId);
        if (!updatedNote) {
            const error = new Error('Note not found.');
            error.statusCode = 404;
            throw error;
        }
        if (updatedNote.userId !== req.userId) {
            const error = new Error('Not authorized!.');
            error.statusCode = 403;
            throw error;
        }
        updatedNote.title = title;
        updatedNote.body = body;
        await updatedNote.save();
        return res.status(202).json(updatedNote);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.deleteNote = async (req, res, next) => {
    const id = req.params.id;
    try {
        const note = await Note.findByPk(id);
        if (!note) {
            const error = new Error('Note not found.');
            error.statusCode = 404;
            throw error;
        }
        if (note.userId !== req.userId) {
            const error = new Error('Not authorized.');
            error.statusCode = 403;
            throw error;
        }
        await note.destroy();
        return res
            .status(200)
            .json({ message: `Note ${id} has been deleted.` });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};
