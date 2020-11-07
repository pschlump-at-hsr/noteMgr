export class SettingsController {

    setSettings(req, res) {
        console.log(req.params.id);

        switch (req.params.id) {
            case '1':
                req.userSettings.orderBy = '{ _deadline: 1 }';
                break;
            case '2':
                req.userSettings.orderBy = '{ _createDate: 1 }';
                break;
            case '3':
                req.userSettings.orderBy = '{ _importance: 1 }';
                break;
            case '4':
                console.log("Ich war hier");
                req.userSettings.styleMode = (req.userSettings.styleMode === 'light-theme') ? 'dark-theme' : 'light-theme';
                console.log(req.userSettings.styleMode === 'light-theme');
                break;
            case '5':
                req.userSettings.doLimit = (req.userSettings.styleMode === '') ? '{ _isNoteDone: false}' : '{}';
                break;
        }
        console.log(req.userSettings.styleMode);
        res.redirect("/");
    };

}


export const settingsController = new SettingsController();
