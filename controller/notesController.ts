import {noteStore} from '../services/noteStore.js'

export class NotesController {
    createNote(req, res) {
        res.render("note");
    };

    async createNewNote(req, res) {
        console.log('noteTitle ' + req.fields.title +' noteDescription ' + req.fields.description +' importance ' + req.fields.importance +' deadline ' + req.fields.deadline);
        noteStore.add(req.fields.title, req.fields.description, req.fields.importance, req.fields.deadline, req.fields.done).then(() => res.redirect('/'));
    };

    async updateNote(req, res) {
        noteStore.update(req).then(value => {
            console.log(value)
            res.redirect('/')
        });
    };

    async showNote(req, res) {
        console.log(await noteStore.get(req.params.id))
        noteStore.get(req.params.id).then(value => {
            console.log(value.noteTitle);
            res.render("showNote", {note: value});
        })
    };

    async finish(req, res) {
        res.render("index", await noteStore.finish(req.fields.id));
    };

}

export const settingsController = new NotesController();