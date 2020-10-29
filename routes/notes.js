import express from 'express';
const notesRouter = express.Router();
import {notesController} from '../controller/notesController.js';

/* GET users listing. */
notesRouter.get('/', notesController.createNote.bind(notesController));
notesRouter.get("/notes/:id/", notesController.showNote.bind(notesController));
notesRouter.post("/notes/:id/", notesController.updateNote.bind(notesController));
notesRouter.post("/", notesController.createNewNote.bind(notesController));
export {notesRouter};
