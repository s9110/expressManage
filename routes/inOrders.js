var express = require('express');
var router = express.Router();

var monk = require('monk');
var dbConfig = require('../bin/db');

// connect to mongoDB database defined in db.js
var database = monk(dbConfig.url);

// Get all inorders from Database
router.get('/', function(req, res) {
    var collection = database.get('inorders');
    collection.find({}, function(err, inorders) {
        if (err) throw err;
        res.json(inorders);
    });
});

// Add InOrder to db
router.post('/', function(req, res) {
    var collection = database.get('inorders');
    collection.insert({
        lotNumber: req.body.lotNumber,
        inDate: req.body.inDate,
        customerName: req.body.customerName,
        orderProducts: req.body.orderProducts
    }, function(err, inOrder) {
        if (err) throw err;

        res.json(inOrder);
    });
});

module.exports = router;
