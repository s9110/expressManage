var express = require('express');
var router = express.Router();

var monk = require('monk');
var dbConfig = require('../bin/db');

// connect to mongoDB database defined in db.js
var database = monk(dbConfig.url);

// Get counters form database
router.get('/', function(req, res) {
    var collection = database.get('counters');
    collection.findOne({
        'sequenceName': req.params.sequenceName
    }, function(err, counter) {
        if (err) throw err;

        res.json(counter);
    });
});

// Get one counter from database
// router.get('/:id', function(req, res) {
//     var collection = database.get('counter');
//     collection.findOne({
//         _id: req.params.id
//     }, function(err, counter) {
//         if (err) throw err;
//
//         res.json(counter);
//     });
// });

// Initialize counter sequence
router.post('/', function(req, res) {
    var collection = database.get('counters');
    console.log('..req.body._id: ', req.body._id);
    collection.insert({
        sequenceName: req.body.sequenceName,
        sequenceValue : req.body.sequenceValue
    }, function(err, lotNumber) {
        if (err) throw err;
        res.json(lotNumber);
    });
});

module.exports = router;
