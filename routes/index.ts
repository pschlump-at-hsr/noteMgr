import express from "express";
import {Note, noteStore} from "../services/noteStore.js";
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function (req, res) {
  noteStore.all().then(value => {
    let notes: Note[] = [];
    value.forEach(doc => {
      notes.push(doc as unknown as Note)
      console.log(notes[0].noteTitle);
    });
    res.render('index', {title: 'Express', notes: notes, style: 'dark-theme'});
  })
});


export {indexRouter};
