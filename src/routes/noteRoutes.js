import { Router } from 'express';
import * as notesController from '../controllers/notesController';
import inputValidator from '../utils/inputValidations';

const router = Router();
//  Route: /api/notes
router
    .route('/notes')
    .get(notesController.getAllNotes)
    .post(inputValidator.notes, notesController.postNotes);

//  Route: /api/notes/~someId~
router
    .route('/notes/:id')
    .get(notesController.getNote)
    .put(inputValidator.notes, notesController.updateNote)
    .delete(notesController.deleteNote);

export default router;
