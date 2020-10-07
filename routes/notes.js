import express from 'express';
const notesRouter = express.Router();
import {notesController} from '../controller/notesController.js';

/* GET users listing. */
notesRouter.get('/', function(req, res, next) {
    res.render('note');
});
notesRouter.get("/orders/:id/", notesController.showNotes);

export {notesRouter};
