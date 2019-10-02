import Note from '../models/Note';
import User from '../models/User';
import { validationResult } from 'express-validator/check';

exports.getAllNotes = async (req, res, next) => {
    try {
        const Notes = await Note.findAll();
        return res.status(200).json(Notes);
    } catch (err) {
        console.error(err);
    }
};

exports.postNotes = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: 'Validation failed.' });
    }
    const { title, body } = req.body;
    const newNote = new Note({
        title: title,
        body: body,
    });
    try {
        await newNote.save();
        return res.status(200).json({ message: 'Note created.' });
    } catch (err) {
        console.error(err);
    }
};

exports.getNote = async (req, res, next) => {
    const id = req.params.id;
    try {
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404);
        }
        return res.status(200).json(note);
    } catch (err) {
        console.error(err);
    }
};

exports.updateNote = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: 'Validation failed.' });
    }
    const id = req.params.id;
    const { title, body } = req.body;
    try {
        const updatedNote = await Note.findByPk(id);
        if (!updatedNote) {
            return res.status(404).end();
        }
        updatedNote.title = title;
        updatedNote.body = body;
        await updatedNote.save();
        return res.status(200).json(updatedNote);
    } catch (err) {
        console.error(err);
    }
};

exports.deleteNote = async (req, res, next) => {
    const id = req.params.id;
    try {
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).end();
        }
        await note.destroy();
        return res
            .status(200)
            .json({ message: `Note ${id} has been deleted.` });
    } catch (err) {
        console.error(err);
    }
};
