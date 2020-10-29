import express from "express";
import formidableMiddleware  from 'express-formidable';
import createError from "http-errors";
import path from "path";
import session from 'express-session';
import cookieParser from "cookie-parser";
import logger from "morgan";
import sassMiddleware from "node-sass-middleware";

import {indexRouter} from "./routes";
import {notesRouter} from "./routes/notes.js";

const app = express();

// view engine setup
app.set('views', path.join(path.resolve('public') , 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(session({secret: 'loremipsumdolorsitametonsecteturadipisicielit', resave: false, saveUninitialized: true}));
app.use(formidableMiddleware());
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(path.resolve('public'), 'public'),
  dest: path.join(path.resolve('public'), 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(path.resolve('public'), 'public')));

app.use('/', indexRouter);
app.use('/notes', notesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next()
});

export {app};
