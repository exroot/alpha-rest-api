import { Router } from 'express';
import * as notesController from '../controllers/notesController';

const router = Router();

//  Route: /api/notes
router
    .route('/notes')
    .get(notesController.getAllNotes)
    .post(notesController.postNotes);

//  Route: /api/notes/~someId~
router
    .route('/notes/:id')
    .get(notesController.getNote)
    .put(notesController.updateNote)
    .delete(notesController.deleteNote);

export default router;
