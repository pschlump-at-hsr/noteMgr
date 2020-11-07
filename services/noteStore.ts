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
        private _createDate: Date;
        private _isNoteDone: boolean;

        constructor(noteTitle: string, noteDescription: string, importance: string, deadline: Date, createDate: Date, isNoteDone: boolean) {
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
            let note = new Note(noteTitle, noteDescription, '*'.repeat(importance), deadline, createDate, isNoteDone);
            return await noteStore.db.insert(note);
        }

        async update(req: { fields: { id: string; title: string; description: string; importance: number; deadline: Date; done: boolean; }; }) {
            // @ts-ignore
            return await noteStore.db.update({_id: '' + req.fields.id + ''}, {
                $set: {
                    _noteTitle: req.fields.title,
                    _noteDescription: req.fields.description,
                    _importance: req.fields.importance,
                    _deadline: req.fields.deadline,
                    _isNoteDone: req.fields.done
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

        async all(req) {
            console.log('limit: '+req.userSettings.doLimit+' orderBy:'+req.userSettings.orderBy);
            return noteStore.db.find(req.userSettings.doLimit).sort(req.userSettings.orderBy).then(value => {
                return value;
            });
        }
    }
    export const noteStore = new NoteStore();