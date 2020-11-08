export const sessionUserSettings = (req, res, next) => {
    // default Wert oder aktueller Wert von der Session lesen
    const userSettings = req.session.userSettings || {
        orderBy: {deadline: 1},
        doLimit: {},
        orderDirectionDeadline: '',
        orderDirectionCreateDate: '',
        orderDirectionImportance: '',
        styleMode: 'light-theme'
    };
    const {orderBy, doLimit, styleMode, orderDirectionDeadline, orderDirectionCreateDate, orderDirectionImportance} = req.query;

    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (doLimit) {
        userSettings.doLimit = doLimit;
    }
    if (styleMode) {
        userSettings.styleMode = styleMode;
    }
    if (orderDirectionDeadline) {
        userSettings.orderDirectionDeadline = orderDirectionDeadline;
    }
    if (orderDirectionCreateDate) {
        userSettings.orderDirectionCreateDate = orderDirectionCreateDate;
    }
    if (orderDirectionImportance) {
        userSettings.orderDirectionImportance = orderDirectionImportance;
    }
    req.userSettings = req.session.userSettings = userSettings;

    next();
};