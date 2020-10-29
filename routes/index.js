import express from "express";
import {noteStore} from "../services/noteStore.js";
const indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function (req, res) {
  noteStore.all().then(value => res.render('index', {title: 'Express', notes: value}))
});


export {indexRouter};
