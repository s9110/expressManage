var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('newIndex', {
        title: 'New Index Page',
        username: 'Fazle Abbas',
        messageFrom: 'Divya Ugale'
    });
});

module.exports = router;
