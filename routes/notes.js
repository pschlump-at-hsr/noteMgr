var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('note');
});
router.get("/orders/:id/", orders.showOrder);

module.exports = router;
