import express from "express";
import {Note, noteStore} from "../services/noteStore.js";

const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function (req: any, res) {
    noteStore.all(req).then(value => {
        let notes: Note[] = [];
        value.forEach(doc => {
            let note = doc as unknown as Note
            // @ts-ignore
            note.isNoteDone = doc._isNoteDone ? 'checked' : '';
            notes.push(note);
        });
        res.render('index', {
            title: 'Todo Manager',
            notes: notes,
            style: req.session.userSettings.styleMode,
            orderDirectionDeadline: req.session.userSettings.orderDirectionDeadline,
            orderDirectionCreateDate: req.session.userSettings.orderDirectionCreateDate,
            orderDirectionImportance: req.session.userSettings.orderDirectionImportance,
            hideFinished: (JSON.stringify(req.session.userSettings.doLimit) === '{}') ? '' : 'asc'
        });
    })
});


export {indexRouter};
