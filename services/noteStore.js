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

    async add(noteTitle, noteDescription, importance, deadline, isNoteDone = false) {
        console.log('noteTitle ' + noteTitle +' noteDescription ' + noteDescription +' importance ' + importance +' deadline ' + deadline);
        let note = new Note(noteTitle, noteDescription, importance, deadline, isNoteDone);
        return await this.db.insert(note);
    }

    async update(req) {
        return await this.db.update({ _id: req.fields.id }, {
            $set: {
                title: req.fields.title,
                description: req.fields.description,
                importance: req.fields.importance,
                deadline: req.fields.deadline,
                isNoteDone: req.fields.done
            }
        });
    }

    async finish(id) {
        await this.db.update({_id: id}, {$set: {isNoteDone: "TRUE"}});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.find({}, function (err, docs) {
            return docs
        });
    }
}

export const noteStore = new NoteStore();