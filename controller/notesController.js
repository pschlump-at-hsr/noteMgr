import {noteStore} from '../services/noteStore.js'

export class NotesController {
    createNote(req, res) {
        res.render("note");
    };

    async createNewNote(req, res) {
        console.log('noteTitle ' + req.fields.title +' noteDescription ' + req.fields.description +' importance ' + req.fields.importance +' deadline ' + req.fields.deadline);
        res.render("index", await noteStore.add(req.fields.title, req.fields.description, req.fields.importance, req.fields.deadline, req.fields.done));
    };

    async updateNote(req, res) {
        noteStore.update(req).then(value => res.render("index", value ));
    };

    async showNote(req, res) {
        console.log("id: "+req.fields.id)
        noteStore.get(req.fields.id).then(value => res.render("note", value));
    };

    async finish(req, res) {
        res.render("index", await noteStore.finish(req.fields.id));
    };

}

export const notesController = new NotesController();