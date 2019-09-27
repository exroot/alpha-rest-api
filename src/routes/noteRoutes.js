import express from 'express';
import notesController from '../controllers/notesController';

const router = express.Router();

router.get('/notes', notesController.getNotes);
router.post('/notes', notesController.postNotes);

router.get('/notes/:id', notesController.getSingleNote);
router.post('/notes/:id', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);

export default router;
