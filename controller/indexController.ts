import {noteStore} from "../services/noteStore.js";

export class IndexController {

    index(req, res) {
        noteStore.all(req).then(value => {
            console.log(JSON.stringify(value));
            res.render("index", {title: 'Express', notes: value, style: req.session.userSettings.styleMode})
        });
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
