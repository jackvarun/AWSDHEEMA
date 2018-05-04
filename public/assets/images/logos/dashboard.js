var express = require('express');
var router = express.Router();


// define create route
router.get('/', function (req, res, next) {
  res.render('dashboard/index', {title: 'Dash board'});
});


module.exports = router;
