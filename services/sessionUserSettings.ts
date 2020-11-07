export const sessionUserSettings = (req, res, next) => {
    // default Wert oder aktueller Wert von der Session lesen
    const userSettings = req.session.userSettings || {orderBy: '{ deadline: "1"}', doLimit: '', styleMode: 'light-theme'};
    const {orderBy, doLimit, styleMode} = req.query;


    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (doLimit) {
        userSettings.doLimit = doLimit;
    }
    if (styleMode) {
        userSettings.styleMode = styleMode;
    }
    req.userSettings = req.session.userSettings = userSettings;

    next();
};