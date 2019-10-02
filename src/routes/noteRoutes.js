import { Router } from 'express';
import { body } from 'express-validator-/check';
import * as notesController from '../controllers/notesController';

const router = Router();
const inputValidation = [
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('body')
        .trim()
        .isLength({ min: 5 }),
];
//  Route: /api/notes
router
    .route('/notes')
    .get(notesController.getAllNotes)
    .post(inputValidation, notesController.postNotes);

//  Route: /api/notes/~someId~
router
    .route('/notes/:id')
    .get(notesController.getNote)
    .put(inputValidation, notesController.updateNote)
    .delete(notesController.deleteNote);

export default router;
