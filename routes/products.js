var express = require('express');
var router = express.Router();

var monk = require('monk');
var dbConfig = require('../bin/db');

// connect to mongoDB database defined in db.js
var database = monk(dbConfig.url);

// Get all products from Database
router.get('/', function(req, res) {
    var collection = database.get('products');
    collection.find({}, function(err, products) {
        if (err) throw err;
        res.json(products);
    });
});

// Add product to db
router.post('/', function(req, res) {
    var collection = database.get('products');
    collection.insert({
        name: req.body.name,
        ratePerMonth: req.body.ratePerMonth,
        containerType: req.body.containerType
    }, function(err, product) {
        if (err) throw err;

        res.json(product);
    });
});

// Get single existing product
router.get('/:id', function(req, res) {
    var collection = database.get('products');
    collection.findOne({
        _id: req.params.id
    }, function(err, product) {
        if (err) throw err;

        res.json(product);
    });
});

// Update single existing product
router.put('/:id', function(req, res) {
    var collection = database.get('products');
    collection.update({
        _id: req.params.id
    }, {
        name: req.body.name,
        ratePerMonth: req.body.ratePerMonth,
        containerType: req.body.containerType
    }, function(err, product) {
        if (err) throw err;

        res.json(product);
    });
});

// Delete existing product
router.delete('/:id', function(req, res) {
    var collection = database.get('products');
    collection.remove({
        _id: req.params.id
    }, function(err, product) {
        if (err) throw err;

        res.json(product);
    });
});

module.exports = router;
