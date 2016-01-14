var express = require('express');
var router = express.Router();

var monk = require('monk');
var dbConfig = require('../bin/db');

// connect to mongoDB database defined in db.js
var database = monk(dbConfig.url);

// Get all customers from Database
router.get('/', function(req, res) {
    var collection = database.get('customers');
    collection.find({}, function(err, customers) {
        if (err) throw err;
        res.json(customers);
    });
});

// Add customers to db
router.post('/', function(req, res) {
    var collection = database.get('customers');
    collection.insert({
        firmName: req.body.firmName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        landmark: req.body.landmark,
        city: req.body.city,
        mobile: req.body.mobile,
        landline: req.body.landline,
    }, function(err, customers) {
        if (err) throw err;

        res.json(customer);
    });
});

module.exports = router;
