import Datastore from 'nedb-promises'
    export class Note {
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

        get isNoteDone(): any {
            return this._isNoteDone;
        }

        set isNoteDone(value: any) {
            this._isNoteDone = value;
        }

        private _noteTitle: string;
        private _noteDescription: string;
        private _importance: any;
        private _deadline: Date;
        private _createDate: Date;
        private _isNoteDone: any;

        constructor(noteTitle: string, noteDescription: string, importance: number, deadline: Date, createDate: Date, isNoteDone: any) {
            this._noteTitle = noteTitle;
            this._noteDescription = noteDescription;
            this._importance = importance;
            this._deadline = deadline;
            this._createDate = createDate;
            this._isNoteDone = isNoteDone;
        }
    }

    export class NoteStore {
        private db: Datastore;

        constructor(db?: Datastore) {
            this.db = db || new Datastore({filename: './data/notes.db', autoload: true, corruptAlertThreshold: 1 });
        }

        async add(noteTitle: string, noteDescription: string, importance: number, deadline: Date, createDate: Date, isNoteDone: boolean = false) {
            console.log('noteTitle ' + noteTitle + ' noteDescription ' + noteDescription + ' importance ' + importance + ' deadline ' + deadline);
            let note = new Note(noteTitle, noteDescription, importance, deadline, createDate, isNoteDone);
            return await noteStore.db.insert(note);
        }

        async update(req) {
            // @ts-ignore
            let query = {_id: req.params.id};
            console.log('Query: '+JSON.stringify(query));
            console.log('Done: '+JSON.stringify(req.fields.done));
            console.log('on'.localeCompare(req.fields.done) == 0);
            return await noteStore.db.update({_id: req.params.id}, {

                $set: {
                    _noteTitle: req.fields.title,
                    _noteDescription: req.fields.description,
                    _importance: req.fields.importance,
                    _deadline: req.fields.deadline,
                    _isNoteDone: 'on'.localeCompare(req.fields.done) == 0
                }
            });
        }

        async get(id: string): Promise<Note> {
            return await noteStore.db.findOne({_id: id}).then((value) => {
                return value as unknown as Note
            });
        }

        async all(req) {
            return noteStore.db.find(req.userSettings.doLimit).sort(req.userSettings.orderBy).then(values => {
                return values;
            });
        }
    }
    export const noteStore = new NoteStore();