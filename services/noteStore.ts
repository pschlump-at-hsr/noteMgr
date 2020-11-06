import Datastore from 'nedb-promises'
    export class Note {
        get noteTitle(): string {
            return this._noteTitle;
        }

        set noteTitle(value: string) {
            this._noteTitle = value;
        }

        get noteDescription(): string {
            return this._noteDescription;
        }

        set noteDescription(value: string) {
            this._noteDescription = value;
        }

        get importance(): string {
            return this._importance;
        }

        set importance(value: string) {
            this._importance = value;
        }

        get deadline(): Date {
            return this._deadline;
        }

        set deadline(value: Date) {
            this._deadline = value;
        }

        get isNoteDone(): boolean {
            return this._isNoteDone;
        }

        set isNoteDone(value: boolean) {
            this._isNoteDone = value;
        }

        private _noteTitle: string;
        private _noteDescription: string;
        private _importance: string;
        private _deadline: Date;
        private _isNoteDone: boolean;

        constructor(noteTitle: string, noteDescription: string, importance: string, deadline: Date, isNoteDone: boolean) {
            this._noteTitle = noteTitle;
            this._noteDescription = noteDescription;
            this._importance = importance;
            this._deadline = deadline;
            this._isNoteDone = isNoteDone;
        }
    }

    export class NoteStore {
        private db: Datastore;

        constructor(db?: Datastore) {
            this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
        }

        async add(noteTitle: string, noteDescription: string, importance: number, deadline: Date, isNoteDone: boolean = false) {
            console.log('noteTitle ' + noteTitle + ' noteDescription ' + noteDescription + ' importance ' + importance + ' deadline ' + deadline);
            let note = new Note(noteTitle, noteDescription, '*'.repeat(importance), deadline, isNoteDone);
            return await noteStore.db.insert(note);
        }

        async update(req: { fields: { id: string; title: string; description: string; importance: number; deadline: Date; done: boolean; }; }) {
            return await noteStore.db.update({_id: '' + req.fields.id + ''}, {
                $set: {
                    title: '' + req.fields.title + '',
                    description: '' + req.fields.description + '',
                    importance: '' + req.fields.importance + '',
                    deadline: '' + req.fields.deadline + '',
                    isNoteDone: '' + req.fields.done + ''
                }
            }) as unknown as Note;
        }

        async finish(id: string) {
            await noteStore.db.update({_id: id}, {$set: {isNoteDone: "TRUE"}});
            return await noteStore.get(id);
        }

        async get(id: string): Promise<Note> {
            console.log("{_id: \""+id+"\"}");
            return await noteStore.db.findOne({_id: '' + id + ''}).then((value) => {
                return value as unknown as Note
            });
        }

        async all() {
            return noteStore.db.find({}, function (err: any, docs: any) {
                return docs
            });
        }
    }
    export const noteStore = new NoteStore();