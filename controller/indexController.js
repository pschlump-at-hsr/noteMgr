import {noteStore} from '../services/noteStore.js';

export class IndexController {

    index(req, res) {
        res.render("index", noteStore.all());
    };

    _handleBackRef(req, res) {
        if (req.body._backref) {
            res.redirect(req.body._backref);
        }
        else {
            res.redirect("/");
        }
    }
}

export const indexController = new IndexController();
