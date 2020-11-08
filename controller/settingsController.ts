export class SettingsController {

    setSettings(req, res) {
        switch (req.params.id) {
            case '1':
                req.userSettings.orderBy = (JSON.stringify(req.userSettings.orderBy) === JSON.stringify({_deadline: 1})) ? {_deadline: -1} : {_deadline: 1};
                req.userSettings.orderDirectionDeadline = (JSON.stringify(req.userSettings.orderBy) === JSON.stringify({_deadline: 1})) ? 'asc' : 'desc'
                req.userSettings.orderDirectionCreateDate = ''
                req.userSettings.orderDirectionImportance = ''
                break;
            case '2':
                req.userSettings.orderBy = (JSON.stringify(req.userSettings.orderBy) === JSON.stringify({_createDate: 1})) ? {_createDate: -1} : {_createDate: 1};
                req.userSettings.orderDirectionDeadline = ''
                req.userSettings.orderDirectionCreateDate = (JSON.stringify(req.userSettings.orderBy) === JSON.stringify({_createDate: 1})) ? 'asc' : 'desc'
                req.userSettings.orderDirectionImportance = ''
                break;
            case '3':
                req.userSettings.orderBy = (JSON.stringify(req.userSettings.orderBy) === JSON.stringify({_importance: 1})) ? {_importance: -1} : {_importance: 1};
                req.userSettings.orderDirectionDeadline = ''
                req.userSettings.orderDirectionCreateDate = ''
                req.userSettings.orderDirectionImportance = (JSON.stringify(req.userSettings.orderBy) === JSON.stringify({_importance: 1})) ? 'asc' : 'desc'
                break;
            case '4':
                req.userSettings.styleMode = (req.userSettings.styleMode === 'light-theme') ? 'dark-theme' : 'light-theme';
                break;
            case '5':
                console.log('doLimit: ' + JSON.stringify(req.userSettings.doLimit));
                req.userSettings.doLimit = (JSON.stringify(req.userSettings.doLimit) === '{}') ? {_isNoteDone: false} : {};
                console.log('doLimit: ' + JSON.stringify(req.userSettings.doLimit));
                break;
        }
        res.redirect("/");
    };

}


export const settingsController = new SettingsController();
