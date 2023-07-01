var router = require('express').Router();

router.get('/', function(req, res) {
    res.send('Index Page');
});



module.exports = router;