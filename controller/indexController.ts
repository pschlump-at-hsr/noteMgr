import {noteStore} from "../services/noteStore.js";

export class IndexController {

    index(req, res) {
        noteStore.all(req).then(value => {
            res.render("index", {
                title: 'Todo Manager',
                notes: value,
                style: req.session.userSettings.styleMode,
                orderDirectionDeadline: req.session.userSettings.orderDirectionDeadline,
                orderDirectionCreateDate: req.session.userSettings.orderDirectionCreateDate,
                orderDirectionImportance: req.session.userSettings.orderDirectionImportance
            });
        });
    };

    _handleBackRef(req, res) {
        if (req.body._backref) {
            res.redirect(req.body._backref);
        } else {
            res.redirect("/");
        }
    }
}

export const indexController = new IndexController();
