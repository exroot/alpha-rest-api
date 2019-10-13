import { Router } from 'express';
import * as notesController from '../controllers/notesController';
import inputValidator from '../middlewares/inputValidations';
import isAuth from '../middlewares/is-auth';

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
    .put(isAuth, inputValidator.notes, notesController.updateNote)
    .delete(isAuth, notesController.deleteNote);

export default router;
