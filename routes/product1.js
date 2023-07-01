/*
Product 1 Api List
*/
var router = require('express').Router();



router.get('/', function(req, res) {
    res.send('Product 1-Index Page');
});

router.get('/api1', function(req, res) {
    res.send('Users Product 1-API1');
});

router.get('/api2', function(req, res) {
    res.send('Users Product 1-API2');
});

module.exports = router;