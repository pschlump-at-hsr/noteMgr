import Datastore from 'nedb-promise'

export class Note {
    constructor(noteTitle, noteDescription, importance, deadline, isNoteDone) {
        this.noteTitle = noteTitle;
        this.noteDescription = noteDescription;
        this.importance = importance;
        this.deadline = deadline;
        this.isNoteDone = isNoteDone;
    }
}

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(noteTitle, noteDescription, importance, deadline, isNoteDone) {
        let note = new Note(noteTitle, noteDescription, importance, deadline, isNoteDone);
        return await this.db.insert(note);
    }

    async finish(id) {
        await this.db.update({_id: id}, {$set: {"isNoteDone": "TRUE"}});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.find({});
    }
}

export const noteStore = new NoteStore();