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

// Add customer to db
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
    }, function(err, customer) {
        if (err) throw err;

        res.json(customer);
    });
});

// Get single existing customer
router.get('/:id', function(req, res) {
    var collection = database.get('customers');
    collection.findOne({
        _id: req.params.id
    }, function(err, customer) {
        if (err) throw err;

        res.json(customer);
    });
});

// Update single existing customer
router.put('/:id', function(req, res) {
    var collection = database.get('customers');
    collection.update({
        _id: req.params.id
    }, {
        firmName: req.body.firmName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        landmark: req.body.landmark,
        city: req.body.city,
        mobile: req.body.mobile,
        landline: req.body.landline,
    }, function(err, customer) {
        if (err) throw err;

        res.json(customer);
    });
});

// Delete existing customer
router.delete('/:id', function(req, res) {
    var collection = database.get('customers');
    collection.remove({
        _id: req.params.id
    }, function(err, customer) {
        if (err) throw err;

        res.json(customer);
    });
});


module.exports = router;
