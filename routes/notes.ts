import express from 'express';
const notesRouter = express.Router();
import {notesController} from '../controller/notesController.js';

/* GET users listing. */
notesRouter.get('/', notesController.createNote.bind(notesController));
notesRouter.get("/:id/", notesController.showNote.bind(notesController));
notesRouter.post("/:id/", notesController.updateNote.bind(notesController));
notesRouter.post("/", notesController.createNewNote.bind(notesController));
export {notesRouter};
