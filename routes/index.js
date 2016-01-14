var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Index',
        username: 'Fazle Abbas',
        messageFrom: 'Divya Ugale'
    });
});

module.exports = router;
