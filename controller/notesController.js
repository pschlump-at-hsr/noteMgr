import {noteStore} from '../services/noteStore.js';

export class NotesController {
    createNote(req, res) {
        res.render("note");
    };

    async createNewNote(req, res) {
        res.render("index", await noteStore.add(req.params.title, req.params.description, req.params.importance, req.params.deadline, req.params.done));
    };

    async showOrder(req, res) {
        res.render("note", await noteStore.get(req.params.id));
    };

    async finish(req, res) {
        res.render("index", await noteStore.finish(req.params.id));
    };

}

export const notesController = new NotesController();