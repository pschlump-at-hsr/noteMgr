export class SettingsController {
    setSettings(req, res) {
        let orderBy = JSON.stringify(req.userSettings.orderBy);
        switch (req.params.id) {
            case '1':
                let deadline = JSON.stringify({_deadline: 1});
                req.userSettings.orderBy = (orderBy === deadline) ? {_deadline: -1} : {_deadline: 1};
                req.userSettings.orderDirectionDeadline = (orderBy === deadline) ? 'asc' : 'desc'
                req.userSettings.orderDirectionCreateDate = ''
                req.userSettings.orderDirectionImportance = ''
                break;
            case '2':
                let createDate = JSON.stringify({_createDate: 1});
                req.userSettings.orderBy = (orderBy === createDate) ? {_createDate: -1} : {_createDate: 1};
                req.userSettings.orderDirectionDeadline = ''
                req.userSettings.orderDirectionCreateDate = (orderBy === createDate) ? 'asc' : 'desc'
                req.userSettings.orderDirectionImportance = ''
                break;
            case '3':
                let importance = JSON.stringify({_importance: 1});
                req.userSettings.orderBy = (orderBy === importance) ? {_importance: -1} : {_importance: 1};
                req.userSettings.orderDirectionDeadline = ''
                req.userSettings.orderDirectionCreateDate = ''
                req.userSettings.orderDirectionImportance = (orderBy === importance) ? 'asc' : 'desc'
                break;
            case '4':
                req.userSettings.styleMode = (req.userSettings.styleMode === 'light-theme') ? 'dark-theme' : 'light-theme';
                break;
            case '5':
                req.userSettings.doLimit = (JSON.stringify(req.userSettings.doLimit) === '{}') ? {_isNoteDone: false} : {};
                break;
        }
        res.redirect("/");
    };

}


export const settingsController = new SettingsController();
