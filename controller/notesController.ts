import {noteStore} from '../services/noteStore.js'

export class NotesController {
    createNote(req, res) {
        res.render("note", {title: 'Todo Erstellen', style: req.session.userSettings.styleMode});
    };

    async createNewNote(req, res) {
        console.log('noteTitle ' + req.fields.title + ' noteDescription ' + req.fields.description + ' importance ' + req.fields.importance + ' deadline ' + req.fields.deadline);
        noteStore.add(req.fields.title, req.fields.description, req.fields.importance, req.fields.deadline, new Date(Date.now()), req.fields.done).then(() => res.redirect('/'));
    };

    async updateNote(req, res) {
        console.log(JSON.stringify(req.fields.title));
        noteStore.update(req).then(value => {
            console.log('afterUpdate: ' + JSON.stringify(value))
            res.redirect('/')
        });
    };

    async showNote(req, res) {
        console.log(await noteStore.get(req.params.id))
        noteStore.get(req.params.id).then(value => {
            res.render("showNote", {
                title: 'Todo Bearbeiten',
                note: value,
                style: req.session.userSettings.styleMode,
                checked: value.isNoteDone ? 'checked' : ''
            });
        })
    };
}

export const settingsController = new NotesController();