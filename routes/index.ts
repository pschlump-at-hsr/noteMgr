import express from "express";
import {Note, noteStore} from "../services/noteStore.js";
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function (req: any, res) {
  noteStore.all(req).then(value => {
    let notes: Note[] = [];
    value.forEach(doc => {
      notes.push(doc as unknown as Note);
    });
    console.log(JSON.stringify(value));
    console.log(JSON.stringify(notes));
    res.render('index', {title: 'Express', notes: notes, style: req.session.userSettings.styleMode});
  })
});


export {indexRouter};
