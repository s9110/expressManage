// var express = require('express');
// var router = express.Router();
//
// var monk = require('monk');
// var db = monk('localhost:27017/vidzy');
//
// router.get('/', function(req, res) {
//     var collection = db.get('videos');
//     collection.find({}, function(err, videos){
//         if (err) throw err;
//       	res.json(videos);
//     });
// });
//
// module.exports = router;


var express = require('express');
var router = express.Router();

var monk = require('monk');
var mongoose = require('mongoose');
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

module.exports = router;
