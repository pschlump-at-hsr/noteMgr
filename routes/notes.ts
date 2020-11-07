import express from 'express';
const notesRouter = express.Router();
import {settingsController} from '../controller/notesController.js';

/* GET users listing. */
notesRouter.get('/', settingsController.createNote.bind(settingsController));
notesRouter.get("/:id/", settingsController.showNote.bind(settingsController));
notesRouter.post("/:id/", settingsController.updateNote.bind(settingsController));
notesRouter.post("/", settingsController.createNewNote.bind(settingsController));
export {notesRouter};
